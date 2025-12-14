import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to send reset email');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="login-content" style={{ justifyContent: 'center' }}>
        <div className="login-box" style={{ maxWidth: '500px' }}>
          <div className="login-header">
            <h2>🔑 Forgot Password?</h2>
            <p>Enter your email to receive a reset link</p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="auth-error">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={error ? 'error' : ''}
                />
              </div>

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner">⏳ Sending...</span>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button 
                  type="button"
                  className="toggle-mode"
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </button>
              </div>
            </form>
          ) : (
            <div style={{ padding: '40px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3em', marginBottom: '20px' }}>📧</div>
              <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>Check Your Email!</h3>
              <p>If an account exists with that email, you'll receive a password reset link shortly.</p>
              <button 
                className="btn-login" 
                onClick={() => navigate('/login')}
                style={{ marginTop: '30px' }}
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
