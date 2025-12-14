const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// In-memory storage (replace with database later)
let incidents = [];
let incidentIdCounter = 1;

// Optional: Load sample data for testing (comment out for production)
// const sampleData = require('./sampleData');
// incidents = [...sampleData];
// incidentIdCounter = incidents.length + 1;

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'StudentSafe API is running' });
});

// Get all incidents
app.get('/api/incidents', (req, res) => {
  try {
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incidents', message: error.message });
  }
});

// Get recent incidents (last 24 hours)
app.get('/api/incidents/recent', (req, res) => {
  try {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentIncidents = incidents.filter(incident => incident.timestamp > oneDayAgo);
    res.json(recentIncidents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent incidents', message: error.message });
  }
});

// Report a new incident
app.post('/api/incidents', (req, res) => {
  try {
    const { latitude, longitude, type, description, severity } = req.body;

    if (!latitude || !longitude || !type) {
      return res.status(400).json({ error: 'Latitude, longitude, and type are required' });
    }

    const newIncident = {
      id: incidentIdCounter++,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      type,
      description: description || '',
      severity: severity || 'medium',
      timestamp: Date.now(),
      reportedBy: 'anonymous' // Add user authentication later
    };

    incidents.push(newIncident);
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create incident', message: error.message });
  }
});

// Delete an incident (optional - for admin/moderation)
app.delete('/api/incidents/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    incidents = incidents.filter(incident => incident.id !== id);
    res.json({ message: 'Incident deleted', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete incident', message: error.message });
  }
});

// Get incidents by type
app.get('/api/incidents/type/:type', (req, res) => {
  try {
    const { type } = req.params;
    const filteredIncidents = incidents.filter(incident => incident.type === type);
    res.json(filteredIncidents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incidents by type', message: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`StudentSafe server running on port ${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
});
