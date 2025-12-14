# 🚀 Quick Start Guide - StudentSafe

## Start the Application

### Option 1: Quick Start (Single Command)
```bash
npm run dev-all
```
This runs both backend and frontend simultaneously.

### Option 2: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
npm start
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
App opens on: http://localhost:3000

## First Time Setup

1. **Install all dependencies:**
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

2. **Start the app** (use one of the options above)

3. **Grant location access** when prompted by your browser

## Using the App

### Report an Incident
1. Click "⚠️ Report Danger" button
2. Click on the map where the incident is
3. Fill in the form:
   - Choose incident type (accident, crime, hazard, etc.)
   - Select severity (low, medium, high)
   - Add description (optional)
4. Click "Submit Report"

### View Incidents
- All incidents appear as colored markers on the map
- Click any marker to see details
- Use the filter dropdown to show specific types
- Check the right sidebar for a list of recent reports

### Understanding the Map
- 🔵 Blue marker = Your location
- 🔴 Red markers = Reported incidents (color varies by type)
- Click markers to see incident details

## Troubleshooting

**Location not showing?**
- Make sure you allowed location access
- Check browser settings for location permissions
- Default location (Manila) will show if GPS is unavailable

**Can't connect to server?**
- Make sure backend is running on port 5000
- Check that no other app is using port 5000 or 3000

**Map not loading?**
- Check your internet connection (map tiles require internet)
- Wait a few seconds for tiles to load

## Features at a Glance

✅ Real-time GPS tracking
✅ Interactive map with Leaflet
✅ Report dangerous areas
✅ Filter by incident type
✅ Color-coded severity levels
✅ Mobile responsive
✅ Auto-refresh every 30 seconds

## Need Help?

Check the main [README.md](README.md) for full documentation.

Stay Safe! 🛡️
