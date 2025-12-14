import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({ users: 0, incidents: 0, areas: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible.stats) {
      const animateCounter = (target, setter, max) => {
        let current = 0;
        const increment = max / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= max) {
            setter(max);
            clearInterval(timer);
          } else {
            setter(Math.floor(current));
          }
        }, 30);
      };

      animateCounter('users', (val) => setCounters(prev => ({ ...prev, users: val })), 5000);
      animateCounter('incidents', (val) => setCounters(prev => ({ ...prev, incidents: val })), 1250);
      animateCounter('areas', (val) => setCounters(prev => ({ ...prev, areas: val })), 300);
    }
  }, [isVisible.stats]);

  const features = [
    {
      icon: '📍',
      title: 'Real-time GPS',
      description: 'Track your location and see incidents around you in real-time'
    },
    {
      icon: '⚠️',
      title: 'Report Incidents',
      description: 'Quickly report dangerous areas to help keep the community safe'
    },
    {
      icon: '🗺️',
      title: 'Interactive Map',
      description: 'View all reported incidents on an easy-to-use interactive map'
    },
    {
      icon: '🔍',
      title: 'Smart Filters',
      description: 'Filter incidents by type to see what matters most to you'
    },
    {
      icon: '📱',
      title: 'Mobile Ready',
      description: 'Access from any device - desktop, tablet, or smartphone'
    },
    {
      icon: '🎨',
      title: 'Color-coded',
      description: 'Quick visual identification with severity levels and incident types'
    }
  ];

  const handleGuestAccess = () => {
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('user', JSON.stringify({
      email: 'guest@studentsafe.com',
      username: 'Guest User',
      isGuest: true
    }));
    navigate('/map');
  };

  return (
    <div className="home-container">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower effect */}
      <div
        className="mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge animate-bounce">🛡️ Student Safety Platform</div>
          <h1 className="hero-title">
            Stay <span className="text-gradient">Safe</span>,<br />
            Stay <span className="text-gradient-alt">Connected</span>
          </h1>
          <p className="hero-subtitle animate-fade-in">
            Report dangerous areas, view real-time incidents, and help keep your campus community safe with our GPS-powered safety platform.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary pulse-button" onClick={() => navigate('/login')}>
              Get Started Free
              <span className="button-shine"></span>
            </button>
            <button className="btn-secondary" onClick={handleGuestAccess}>
              Try as Guest
              <span className="arrow">→</span>
            </button>
          </div>
          <div className="trust-indicators">
            <div className="trust-item">
              <div className="check-icon">✓</div>
              <span>No credit card required</span>
            </div>
            <div className="trust-item">
              <div className="check-icon">✓</div>
              <span>Free forever</span>
            </div>
            <div className="trust-item">
              <div className="check-icon">✓</div>
              <span>Setup in 30 seconds</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="phone-notch"></div>
              <div className="phone-map">
                <div className="map-pin pin1">📍</div>
                <div className="map-pin pin2">⚠️</div>
                <div className="map-pin pin3">🚧</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section" data-animate id="stats">
        <div className={`stat-card ${isVisible.stats ? 'visible' : ''}`}>
          <div className="stat-icon">👥</div>
          <div className="stat-number counter">{counters.users}+</div>
          <div className="stat-label">Active Users</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ animationDelay: '0s' }}></div>
          </div>
        </div>
        <div className={`stat-card ${isVisible.stats ? 'visible' : ''}`}>
          <div className="stat-icon">📊</div>
          <div className="stat-number counter">{counters.incidents}+</div>
          <div className="stat-label">Incidents Reported</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        <div className={`stat-card ${isVisible.stats ? 'visible' : ''}`}>
          <div className="stat-icon">🗺️</div>
          <div className="stat-number counter">{counters.areas}+</div>
          <div className="stat-label">Areas Monitored</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" data-animate id="features">
        <h2 className="section-title">Powerful Safety Features</h2>
        <p className="section-subtitle">Everything you need to stay safe and informed</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card interactive-card hover-lift ${
                isVisible.features ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${
                  (y - rect.height / 2) / 10
                }deg) rotateY(${(x - rect.width / 2) / 10}deg) translateY(-15px) scale(1.03)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section" data-animate id="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Get started in three simple steps</p>
        <div className="steps-container">
          <div className={`step ${isVisible['how-it-works'] ? 'visible' : ''}`}>
            <div className="step-number">
              <span>1</span>
              <div className="number-ring"></div>
            </div>
            <div className="step-icon animated-arrow">→</div>
            <h3 className="step-title">Create Account</h3>
            <p className="step-description">Sign up in seconds and join our safety community</p>
          </div>
          <div className={`step ${isVisible['how-it-works'] ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="step-number">
              <span>2</span>
              <div className="number-ring"></div>
            </div>
            <div className="step-icon animated-arrow">→</div>
            <h3 className="step-title">Enable Location</h3>
            <p className="step-description">Allow GPS access to see your position on the map</p>
          </div>
          <div className={`step ${isVisible['how-it-works'] ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <div className="step-number">
              <span>3</span>
              <div className="number-ring"></div>
            </div>
            <h3 className="step-title">Report & View</h3>
            <p className="step-description">Report incidents and view real-time updates on the map</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section" data-animate id="cta">
        <div className="cta-emoji">🚀</div>
        <h2 className="cta-title">Ready to Make Your Community Safer?</h2>
        <p className="cta-subtitle">Join thousands of students protecting each other</p>
        <div className="cta-buttons">
          <button className="btn-white" onClick={() => navigate('/login')}>
            <span>Start Now - It's Free</span>
            <span>🚀</span>
          </button>
          <button className="btn-outline-white" onClick={handleGuestAccess}>
            <span>Try Without Signup</span>
            <span>→</span>
          </button>
        </div>
        <p className="cta-note">✨ No credit card required • Set up in 30 seconds</p>
      </div>
    </div>
  );
}

export default Home;
