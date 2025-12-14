import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MapPage.css';
import Map from '../components/Map';
import ReportForm from '../components/ReportForm';
import IncidentList from '../components/IncidentList';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function MapPage() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [isReportMode, setIsReportMode] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Check authentication
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isGuest = localStorage.getItem('isGuest');
    
    if (!storedUser && !isGuest) {
      navigate('/login');
      return;
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (isGuest === 'true') {
      setUser({ username: 'Guest', isGuest: true });
    }
  }, [navigate]);

  // Get user's current location
  useEffect(() => {
    const fallbackLocation = { lat: 14.5995, lng: 120.9842 }; // Manila default
    let resolved = false;

    const resolveWith = (loc) => {
      if (!resolved) {
        resolved = true;
        setUserLocation(loc);
        setLoading(false);
      }
    };

    // If geolocation available, try with a timeout fallback
    if (navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        console.warn('Geolocation timed out. Using fallback location.');
        resolveWith(fallbackLocation);
      }, 5000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          resolveWith({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error('Error getting location:', error);
          resolveWith(fallbackLocation);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    } else {
      // Geolocation not supported
      resolveWith(fallbackLocation);
    }

    return () => {
      resolved = true;
    };
  }, []);

  // Fetch incidents from API
  const fetchIncidents = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_URL}/incidents`);
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setError('Failed to load incidents. Please try again.');
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
    // Refresh incidents every 30 seconds
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, [fetchIncidents]);

  const handleMapClick = (location) => {
    setSelectedLocation(location);
    setIsFormVisible(true);
  };

  const handleReportSubmit = async (reportData) => {
    try {
      setError(null);
      await axios.post(`${API_URL}/incidents`, reportData);
      setIsFormVisible(false);
      setIsReportMode(false);
      setSelectedLocation(null);
      await fetchIncidents();
      // Show success message
      showNotification('Report submitted successfully! 🎉', 'success');
    } catch (error) {
      console.error('Error submitting report:', error);
      setError('Failed to submit report. Please try again.');
      showNotification('Failed to submit report. Please try again.', 'error');
    }
  };

  const showNotification = (message, type) => {
    // Simple notification (could be replaced with a toast library)
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredIncidents = filterType === 'all' 
    ? incidents 
    : incidents.filter(incident => incident.type === filterType);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner-large">
          <div className="spinner"></div>
          <p>Loading StudentSafe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-page">
      <header className="map-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🛡️ StudentSafe</h1>
            <p>Stay informed, stay safe</p>
          </div>
          <div className="header-right">
            {user && (
              <div className="user-info">
                <span className="user-name">👤 {user.username}</span>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="controls">
        <button 
          className="report-btn"
          onClick={() => {
            if (!isReportMode) {
              setIsReportMode(true);
              setSelectedLocation(null);
              setIsFormVisible(false);
            } else {
              setIsReportMode(false);
              setIsFormVisible(false);
              setSelectedLocation(null);
            }
          }}
        >
          {isReportMode ? '✕ Cancel Reporting' : '⚠️ Report Danger'}
        </button>
        
        <select 
          className="filter-select"
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Incidents</option>
          <option value="accident">🚗 Accidents</option>
          <option value="crime">🚨 Crime</option>
          <option value="hazard">⚡ Hazards</option>
          <option value="suspicious">👁️ Suspicious</option>
          <option value="other">📝 Other</option>
        </select>

        <button className="btn-refresh" onClick={fetchIncidents}>
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="main-content">
        {isFormVisible && (
          <ReportForm
            selectedLocation={selectedLocation}
            onSubmit={handleReportSubmit}
            onCancel={() => {
              setIsFormVisible(false);
              setIsReportMode(false);
              setSelectedLocation(null);
            }}
          />
        )}

        {userLocation && (
          <Map
            center={userLocation}
            incidents={filteredIncidents}
            onMapClick={handleMapClick}
            reportMode={isReportMode && !isFormVisible}
            showInstruction={isReportMode && !isFormVisible}
          />
        )}

        <IncidentList incidents={filteredIncidents} />
      </div>

      <footer className="map-footer">
        <p>Stay safe! Report responsibly. 🛡️</p>
      </footer>
    </div>
  );
}

export default MapPage;
