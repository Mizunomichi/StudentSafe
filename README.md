# 🛡️ StudentSafe Version 1.1

<div align="center">

**A real-time GPS-based safety reporting platform for students and communities**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-Maps-brightgreen?logo=leaflet)](https://leafletjs.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About

StudentSafe is a community-driven safety application that empowers students to report and view dangerous areas in real-time on an interactive map. By crowdsourcing safety information, users can make informed decisions about their routes and stay aware of potential hazards in their surroundings.

### 🎯 Why StudentSafe?

- **Community-Powered**: Real-time reports from students for students
- **Location-Aware**: GPS-based incident mapping with precise coordinates
- **Anonymous Reporting**: Submit safety concerns without revealing your identity
- **Visual Indicators**: Color-coded severity levels for instant risk assessment
- **Mobile-First**: Responsive design works seamlessly on any device

---

## 🌟 Features

### 🗺️ Interactive Mapping
- **Real-time GPS tracking** with animated user location marker
- **Interactive incident markers** with emoji-based visual indicators
- **Clean map interface** powered by CartoDB and Leaflet
- **Click-to-report** functionality for quick incident submission

### ⚠️ Incident Management
- **Multiple incident types**: Accidents, crime, hazards, suspicious activity, and more
- **Severity levels**: Low, medium, and high risk categorization
- **Detailed descriptions**: Add context to help others understand the situation
- **Timestamp tracking**: See how recent each incident is
- **Filtering capabilities**: View specific types of incidents

### 🎨 Modern UI/UX
- **Glassmorphism design**: Beautiful, modern interface with depth and clarity
- **Animated markers**: Pulsing effects for better visibility
- **Responsive layout**: Works on desktop, tablet, and mobile
- **Intuitive controls**: Easy-to-use reporting and navigation

### 🔒 Safety Features
- **Anonymous reporting**: No login required for basic usage
- **Guest access**: Quick access for immediate reporting
- **Community validation**: See patterns of multiple reports in areas
- **Real-time updates**: Latest incidents appear instantly

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI framework
- **React-Leaflet** - Interactive map components
- **Leaflet.js** - Open-source mapping library
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with glassmorphism effects

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Fast, minimalist web framework
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request parsing middleware

### Development Tools
- **Nodemon** - Auto-restart development server
- **Concurrently** - Run multiple commands simultaneously
- **Create React App** - React project boilerplate

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/StudentSafe.git
   cd StudentSafe
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This command installs both backend and frontend dependencies.

3. **Start the application**
   ```bash
   npm run dev-all
   ```
   This runs both the backend server (port 5000) and frontend (port 3000) concurrently.

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Alternative: Manual Setup

If you prefer to run servers separately:

**Backend Server:**
```bash
# Install backend dependencies
npm install

# Start backend server
npm start        # Production mode
# OR
npm run dev      # Development mode with auto-restart
```
Server runs on: `http://localhost:5000`

**Frontend Client:**
```bash
# Navigate to client folder
cd client

# Install frontend dependencies
npm install

# Start React development server
npm start
```
Client runs on: `http://localhost:3000`

---

## 📖 Usage

### For Users

#### 1. **View Your Location**
- The app automatically detects your current location using the browser's geolocation API
- Your position is marked with an animated blue pulse on the map

#### 2. **Report an Incident**
1. Click the **"⚠️ Report Danger"** button in the top navigation
2. Click on the map at the exact location where the incident occurred
3. Fill out the incident form:
   - **Type**: Select from accident, crime, hazard, suspicious activity, or other
   - **Severity**: Choose low, medium, or high
   - **Description**: Provide details to help others (optional but recommended)
4. Click **"Submit Report"** to publish your incident

#### 3. **View Reported Incidents**
- All incidents appear as emoji markers on the map
- Click any marker to view full incident details
- Check the sidebar for a list of recent incidents
- Use filters to show specific incident types

#### 4. **Navigate the Map**
- **Zoom**: Use mouse wheel or +/- controls
- **Pan**: Click and drag the map
- **Tooltips**: Hover over markers for quick info
- **Popups**: Click markers for detailed information
- 
---

## 🎨 Incident Types & Severity

### Incident Types

| Type | Emoji | Description |
|------|-------|-------------|
| Accident | 🚗 | Traffic accidents, vehicle collisions |
| Crime | 🚨 | Theft, assault, criminal activity |
| Hazard | ⚠️ | Road hazards, dangerous conditions |
| Suspicious | 👁️ | Unusual or concerning behavior |
| Other | 📍 | Any other safety concerns |

### Severity Levels

| Level | Color | Badge | Description |
|-------|-------|-------|-------------|
| Low | Green | 🟢 | Minor concern, normal caution |
| Medium | Yellow | 🟡 | Caution advised, stay alert |
| High | Red | 🔴 | Serious danger, avoid if possible |

---

## 🚧 Roadmap

### Phase 1: Core Features ✅
- [x] Interactive map with GPS tracking
- [x] Incident reporting system
- [x] Real-time marker display
- [x] Severity-based color coding
- [x] Anonymous reporting

### Phase 2: Enhanced Features 🚀
- [ ] User authentication & profiles
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Photo uploads for incidents
- [ ] Incident verification system
- [ ] Comment system for incidents

### Phase 3: Advanced Features 🔮
- [ ] Real-time updates with WebSockets
- [ ] Push notifications for nearby incidents
- [ ] Heat map visualization
- [ ] Safe route planning
- [ ] Admin dashboard

### Phase 4: Mobile & Scale 📱
- [ ] React Native mobile app
- [ ] Social features (upvotes, shares)
- [ ] Multi-language support
- [ ] Integration with emergency services
- [ ] Analytics dashboard

---

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
   ```bash
   git clone https://github.com/yourusername/StudentSafe.git
   ```

2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2025 StudentSafe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👥 Authors

- **Mizu** - *Initial work* - [Mizunomichi](https://github.com/Mizunomichi)

---

## 🙏 Acknowledgments

- [Leaflet.js](https://leafletjs.com/) - Amazing open-source mapping library
- [CartoDB](https://carto.com/) - Beautiful basemap tiles
- [React-Leaflet](https://react-leaflet.js.org/) - React integration for Leaflet
- [OpenStreetMap](https://www.openstreetmap.org/) - Map data contributors
- Inspired by community safety initiatives worldwide

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Mizunomichi/StudentSafe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Mizunomichi/StudentSafe/discussions)
- **Email**: your.email@example.com

---

## ⚠️ Important Disclaimer

**This application is for informational and educational purposes only.**

- Always contact local emergency services (911 or your local equivalent) for immediate dangers
- Reports are user-generated and should be independently verified
- Use common sense and exercise caution when evaluating safety information
- The developers are not responsible for the accuracy of user-submitted reports
- Do not rely solely on this app for personal safety decisions

---

<div align="center">

**Stay Safe, Stay Informed! 🛡️**

Made with ❤️ for student safety

[⬆ Back to Top](#-studentsafe)

</div>
