import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Admin credentials
const ADMIN_CREDENTIALS = {
  email: 'zildjiantrixterribo@gmail.com',
  password: 'adminsizild'
};

// Simulated registered users database (in production, this would be on backend)
const REGISTERED_USERS = [
  { email: 'zildjiantrixterribo@gmail.com', password: 'adminsizild', username: 'Admin', role: 'admin' }
];

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setAuthError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      if (isLogin) {
        // LOGIN
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setAuthError(data.error || 'Login failed');
          setLoading(false);
          return;
        }

        // Successful login
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/map');
      } else {
        // SIGN UP
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setAuthError(data.error || 'Registration failed');
          setLoading(false);
          return;
        }

        // Show success message - email verification required
        setAuthError('');
        alert('✅ Registration successful! Please check your email to verify your account before logging in.');
        setIsLogin(true); // Switch to login mode
        setFormData({ email: formData.email, password: '', username: '', confirmPassword: '' });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      setAuthError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
    // Clear auth error when user starts typing
    if (authError) {
      setAuthError('');
    }
  };

  const handleGuestAccess = () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'guest@studentsafe.com',
      username: 'Guest User'
    }));
    navigate('/map');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="login-content">
        <div className="login-left">
          <div className="login-branding">
            <h1>🛡️ StudentSafe</h1>
            <p>Join our community in making neighborhoods safer for everyone</p>
            <div className="login-features">
              <div className="login-feature">
                <span className="feature-check">✓</span>
                <span>Real-time incident reporting</span>
              </div>
              <div className="login-feature">
                <span className="feature-check">✓</span>
                <span>Interactive safety map</span>
              </div>
              <div className="login-feature">
                <span className="feature-check">✓</span>
                <span>Community-driven protection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <authError && (
                <div className="auth-error">
                  <span className="error-icon">⚠️</span>
                  {authError}
                </div>
              )}

              {p>{isLogin ? 'Sign in to continue to StudentSafe' : 'Join us in making communities safer'}</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {!isLogin && (
                <div className="form-field">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className={errors.username ? 'error' : ''}
                  />
                  {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
              )}

              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              )}

              {isLogin && (
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="/forgot-password" className="forgot-link">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner">⏳ Processing...</span>
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <button type="button" className="btn-guest" onClick={handleGuestAccess}>
                Continue as Guest
              </button>
            </form>

            <div className="login-footer">
              <p>  setAuthError('');
                  
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  className="toggle-mode" 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
