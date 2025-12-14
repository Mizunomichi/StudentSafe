import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const severityPalette = {
  low: '#27ae60',
  medium: '#f39c12',
  high: '#e74c3c'
};

const typeEmojis = {
  accident: '🚗',
  crime: '🚨',
  hazard: '⚠️',
  suspicious: '👁️',
  other: '📍'
};

// Custom marker icons for different incident types
const createCustomIcon = (type, severity) => {
  const emoji = typeEmojis[type] || typeEmojis.other;
  const severityClass = severityPalette[severity] ? severity : 'medium';

  return L.divIcon({
    className: `custom-marker severity-${severityClass}`,
    html: `
      <div class="marker-wrapper severity-${severityClass}">
        <div class="marker-pulse"></div>
        <div class="marker-core">
          <span>${emoji}</span>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32]
  });
};

const userIcon = L.divIcon({
  className: 'user-marker',
  html: `
    <div class="user-marker-wrapper">
      <div class="user-pulse"></div>
      <div class="user-core"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

function MapClickHandler({ onMapClick, reportMode }) {
  useMapEvents({
    click: (e) => {
      if (reportMode) {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

function Map({ center, incidents, onMapClick, reportMode, showInstruction }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && center) {
      const currentZoom = mapRef.current.getZoom() || 13;
      mapRef.current.flyTo([center.lat, center.lng], currentZoom, { duration: 1.2 });
    }
  }, [center]);

  const handleMapCreated = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenCreated={handleMapCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        />
        
        <MapClickHandler onMapClick={onMapClick} reportMode={reportMode} />
        
        {/* User location marker */}
        <Marker position={[center.lat, center.lng]} icon={userIcon}>
          <Popup>
            <strong>Your Location</strong>
          </Popup>
          <Tooltip direction="top" offset={[0, -18]} opacity={0.9} permanent>
            You are here
          </Tooltip>
        </Marker>

        {/* Incident markers */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.latitude, incident.longitude]}
            icon={createCustomIcon(incident.type, incident.severity)}
          >
            <Popup>
              <div className="incident-popup">
                <h3>{incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}</h3>
                <p><strong>Severity:</strong> <span className={`severity-${incident.severity}`}>{incident.severity}</span></p>
                {incident.description && <p><strong>Description:</strong> {incident.description}</p>}
                <p className="timestamp">{getTimeAgo(incident.timestamp)}</p>
              </div>
            </Popup>
            <Tooltip direction="top" offset={[0, -16]} opacity={0.95}>
              {typeEmojis[incident.type] || '📍'} {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      
      {showInstruction && (
        <div className="map-instruction">
          📍 Click on the map to select a location for your report
        </div>
      )}
    </div>
  );
}

export default Map;
