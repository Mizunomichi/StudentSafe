// Sample incidents for testing (optional)
// You can use these to pre-populate the app with test data

const sampleIncidents = [
  {
    id: 1,
    latitude: 14.5995,
    longitude: 120.9842,
    type: 'accident',
    description: 'Minor fender bender at intersection',
    severity: 'low',
    timestamp: Date.now() - 1800000, // 30 minutes ago
    reportedBy: 'anonymous'
  },
  {
    id: 2,
    latitude: 14.6042,
    longitude: 120.9822,
    type: 'crime',
    description: 'Reported theft in the area',
    severity: 'high',
    timestamp: Date.now() - 3600000, // 1 hour ago
    reportedBy: 'anonymous'
  },
  {
    id: 3,
    latitude: 14.5950,
    longitude: 120.9900,
    type: 'hazard',
    description: 'Pothole on main road',
    severity: 'medium',
    timestamp: Date.now() - 7200000, // 2 hours ago
    reportedBy: 'anonymous'
  },
  {
    id: 4,
    latitude: 14.6020,
    longitude: 120.9800,
    type: 'suspicious',
    description: 'Suspicious individuals loitering',
    severity: 'medium',
    timestamp: Date.now() - 10800000, // 3 hours ago
    reportedBy: 'anonymous'
  }
];

module.exports = sampleIncidents;
