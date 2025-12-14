import React from 'react';
import './IncidentList.css';

function IncidentList({ incidents }) {
  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const getIncidentIcon = (type) => {
    const icons = {
      accident: '🚗',
      crime: '🚨',
      hazard: '⚡',
      suspicious: '👁️',
      other: '📝'
    };
    return icons[type] || '📝';
  };

  return (
    <div className="incident-list">
      <h2>Recent Reports ({incidents.length})</h2>
      
      {incidents.length === 0 ? (
        <div className="no-incidents">
          <p>✅ No incidents reported in this area</p>
          <p className="subtext">Stay vigilant and report any dangerous situations</p>
        </div>
      ) : (
        <div className="incidents-scroll">
          {incidents
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((incident) => (
              <div key={incident.id} className={`incident-card severity-${incident.severity}`}>
                <div className="incident-header">
                  <span className="incident-icon">{getIncidentIcon(incident.type)}</span>
                  <span className="incident-type">
                    {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
                  </span>
                  <span className={`severity-badge ${incident.severity}`}>
                    {incident.severity}
                  </span>
                </div>
                
                {incident.description && (
                  <p className="incident-description">{incident.description}</p>
                )}
                
                <div className="incident-footer">
                  <span className="incident-time">{getTimeAgo(incident.timestamp)}</span>
                  <span className="incident-location">
                    📍 {incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default IncidentList;
