# 👨‍💻 Developer Guide - StudentSafe

## Project Structure

```
StudentSafe/
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map.js          # Main map component
│   │   │   ├── Map.css
│   │   │   ├── ReportForm.js   # Incident reporting form
│   │   │   ├── ReportForm.css
│   │   │   ├── IncidentList.js # Sidebar incident list
│   │   │   └── IncidentList.css
│   │   ├── App.js              # Root component
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/
│   ├── index.js                # Express API server
│   └── sampleData.js           # Test data
├── .env                        # Environment variables
├── .gitignore
├── package.json                # Backend dependencies
├── README.md                   # Main documentation
├── QUICKSTART.md              # Quick start guide
└── PROJECT_OVERVIEW.md        # Detailed overview

```

## Component Architecture

### App.js (Main Component)
**Responsibilities:**
- State management for incidents
- User location tracking
- API calls to backend
- Coordination between child components

**Key State:**
```javascript
const [incidents, setIncidents] = useState([]);
const [showReportForm, setShowReportForm] = useState(false);
const [userLocation, setUserLocation] = useState(null);
const [selectedLocation, setSelectedLocation] = useState(null);
const [filterType, setFilterType] = useState('all');
```

### Map.js
**Responsibilities:**
- Display interactive Leaflet map
- Show user location marker
- Display incident markers
- Handle map clicks for reporting
- Custom marker styling

**Props:**
```javascript
{
  center: { lat, lng },          // Map center (user location)
  incidents: [...],              // Array of incidents to display
  onMapClick: (location) => {}, // Callback when map is clicked
  reportMode: boolean            // Whether in report mode
}
```

### ReportForm.js
**Responsibilities:**
- Collect incident information
- Validate form data
- Display selected location
- Submit to parent component

**Props:**
```javascript
{
  selectedLocation: { lat, lng },  // Location from map click
  onSubmit: (data) => {},         // Submit callback
  onCancel: () => {}              // Cancel callback
}
```

### IncidentList.js
**Responsibilities:**
- Display list of incidents
- Format timestamps
- Color-code by severity
- Scroll functionality

**Props:**
```javascript
{
  incidents: [...]  // Array of incidents to display
}
```

## API Integration

### Frontend → Backend Communication

**Axios Configuration:**
```javascript
const API_URL = 'http://localhost:5000/api';
```

**Fetch Incidents:**
```javascript
const fetchIncidents = async () => {
  try {
    const response = await axios.get(`${API_URL}/incidents`);
    setIncidents(response.data);
  } catch (error) {
    console.error('Error fetching incidents:', error);
  }
};
```

**Submit Incident:**
```javascript
const handleReportSubmit = async (reportData) => {
  try {
    await axios.post(`${API_URL}/incidents`, reportData);
    fetchIncidents();
  } catch (error) {
    console.error('Error submitting report:', error);
  }
};
```

## State Management

### Current Approach
- React useState hooks
- Prop drilling for simple hierarchy
- API calls in parent component

### Future Improvements
Consider adding:
- Context API for global state
- Redux for complex state management
- React Query for server state
- Local storage for offline support

## Styling Strategy

### Current Approach
- Component-scoped CSS files
- CSS custom properties for theming
- Flexbox for layouts
- Media queries for responsiveness

### CSS Variables (Future)
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --danger-color: #ff6b6b;
  --warning-color: #fdcb6e;
  --success-color: #27ae60;
}
```

## Adding New Features

### Example: Add "Resolved" Status to Incidents

**1. Update Backend Model:**
```javascript
// server/index.js
const newIncident = {
  id: incidentIdCounter++,
  latitude: parseFloat(latitude),
  longitude: parseFloat(longitude),
  type,
  description: description || '',
  severity: severity || 'medium',
  timestamp: Date.now(),
  reportedBy: 'anonymous',
  resolved: false  // NEW FIELD
};
```

**2. Add API Endpoint:**
```javascript
// Mark incident as resolved
app.patch('/api/incidents/:id/resolve', (req, res) => {
  const id = parseInt(req.params.id);
  const incident = incidents.find(i => i.id === id);
  if (incident) {
    incident.resolved = true;
    res.json(incident);
  } else {
    res.status(404).json({ error: 'Incident not found' });
  }
});
```

**3. Update Frontend:**
```javascript
// Add button in IncidentList.js
<button onClick={() => handleResolve(incident.id)}>
  Mark Resolved
</button>

// Add handler
const handleResolve = async (id) => {
  await axios.patch(`${API_URL}/incidents/${id}/resolve`);
  fetchIncidents();
};
```

**4. Update Styling:**
```css
/* IncidentList.css */
.incident-card.resolved {
  opacity: 0.5;
  border-left-color: #27ae60;
}
```

## Database Integration Guide

### Step 1: Choose Database
Options:
- **PostgreSQL + PostGIS** (recommended for spatial data)
- **MongoDB** (flexible schema)
- **MySQL** (traditional relational)

### Step 2: Install Dependencies
```bash
# For PostgreSQL
npm install pg sequelize

# For MongoDB
npm install mongoose
```

### Step 3: Create Schema

**PostgreSQL Example:**
```javascript
// server/models/Incident.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Incident = sequelize.define('Incident', {
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('accident', 'crime', 'hazard', 'suspicious', 'other'),
    allowNull: false
  },
  description: DataTypes.TEXT,
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  reportedBy: DataTypes.STRING
});

module.exports = Incident;
```

### Step 4: Update API Routes
```javascript
// server/index.js
const Incident = require('./models/Incident');

// Get all incidents
app.get('/api/incidents', async (req, res) => {
  try {
    const incidents = await Incident.findAll();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create incident
app.post('/api/incidents', async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Authentication Implementation

### Step 1: Install Dependencies
```bash
npm install bcrypt jsonwebtoken passport passport-jwt
```

### Step 2: Create User Model
```javascript
// server/models/User.js
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
```

### Step 3: Add Auth Routes
```javascript
// server/routes/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  res.json({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});
```

### Step 4: Protect Routes
```javascript
// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Use in routes
app.post('/api/incidents', authMiddleware, async (req, res) => {
  // Only authenticated users can report
});
```

## Testing

### Manual Testing Checklist
- [ ] User location detected correctly
- [ ] Map displays and is interactive
- [ ] Can report new incident
- [ ] Incident appears on map immediately
- [ ] Filter works for all types
- [ ] Form validation works
- [ ] Responsive on mobile
- [ ] Auto-refresh updates data
- [ ] Error handling works

### Unit Testing (Future)
```bash
# Install testing libraries
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Example Test:**
```javascript
// client/src/components/Map.test.js
import { render, screen } from '@testing-library/react';
import Map from './Map';

test('renders map container', () => {
  const center = { lat: 14.5995, lng: 120.9842 };
  render(<Map center={center} incidents={[]} onMapClick={() => {}} reportMode={false} />);
  const mapElement = screen.getByClassName('map-container');
  expect(mapElement).toBeInTheDocument();
});
```

## Performance Optimization

### Current Bottlenecks
- Loading all incidents at once
- No caching
- Frequent re-renders

### Optimization Strategies

**1. Memoization:**
```javascript
import { useMemo, useCallback } from 'react';

const filteredIncidents = useMemo(() => {
  return filterType === 'all' 
    ? incidents 
    : incidents.filter(i => i.type === filterType);
}, [incidents, filterType]);
```

**2. Debouncing:**
```javascript
const debouncedFetch = useCallback(
  debounce(() => fetchIncidents(), 500),
  []
);
```

**3. Virtual Scrolling:**
```bash
npm install react-window
```

**4. Code Splitting:**
```javascript
import { lazy, Suspense } from 'react';

const Map = lazy(() => import('./components/Map'));

<Suspense fallback={<div>Loading...</div>}>
  <Map />
</Suspense>
```

## Debugging Tips

### Check API Connection
```javascript
// In browser console:
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(console.log);
```

### Monitor State Changes
```javascript
useEffect(() => {
  console.log('Incidents updated:', incidents);
}, [incidents]);
```

### Check Map Loading
```javascript
// In Map.js
useEffect(() => {
  console.log('Map center:', center);
  console.log('Incidents to display:', incidents.length);
}, [center, incidents]);
```

## Common Issues & Solutions

### Issue: Map not loading
**Solution:** Check that Leaflet CSS is imported
```javascript
import 'leaflet/dist/leaflet.css';
```

### Issue: Markers not showing
**Solution:** Fix Leaflet default icons
```javascript
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
```

### Issue: CORS errors
**Solution:** Ensure CORS is enabled in backend
```javascript
app.use(cors());
```

### Issue: Location not detected
**Solution:** Use HTTPS or localhost (HTTP geolocation only works on secure origins)

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connected and migrated
- [ ] CORS configured for production domain
- [ ] Build frontend (`npm run build`)
- [ ] Test production build locally
- [ ] SSL certificate configured
- [ ] Error logging set up
- [ ] Performance monitoring added
- [ ] Backup strategy implemented

## Resources

- [React Documentation](https://react.dev/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL + PostGIS](https://postgis.net/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

Happy coding! 🚀
