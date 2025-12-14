import React, { useState, useEffect } from 'react';
import './ReportForm.css';

function ReportForm({ selectedLocation, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'accident',
    description: '',
    severity: 'medium',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    if (selectedLocation) {
      setFormData(prev => ({
        ...prev,
        latitude: selectedLocation.lat.toFixed(6),
        longitude: selectedLocation.lng.toFixed(6)
      }));
    }
  }, [selectedLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.latitude || !formData.longitude) {
      alert('Please select a location on the map');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="report-form-container">
      <form className="report-form" onSubmit={handleSubmit}>
        <h2>⚠️ Report Dangerous Area</h2>
        
        <div className="form-group">
          <label htmlFor="type">Incident Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="accident">🚗 Traffic Accident</option>
            <option value="crime">🚨 Crime / Theft</option>
            <option value="hazard">⚡ Road Hazard</option>
            <option value="suspicious">👁️ Suspicious Activity</option>
            <option value="other">📝 Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="severity">Severity Level *</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
          >
            <option value="low">Low - Minor concern</option>
            <option value="medium">Medium - Caution advised</option>
            <option value="high">High - Serious danger</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the incident (optional)"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <div className="location-display">
            {formData.latitude && formData.longitude ? (
              <>
                <div>📍 Lat: {formData.latitude}</div>
                <div>📍 Lng: {formData.longitude}</div>
              </>
            ) : (
              <div className="no-location">Click on the map to select a location</div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportForm;
