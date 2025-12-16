import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.error || 'Failed to reset password');
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
            <h2>🔑 Reset Password</h2>
            <p>Enter your new password</p>
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
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={error ? 'error' : ''}
                />
              </div>

              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className={error ? 'error' : ''}
                />
              </div>

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner">⏳ Resetting...</span>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>
          ) : (
            <div style={{ padding: '40px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3em', marginBottom: '20px' }}>✅</div>
              <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>Password Reset Successful!</h3>
              <p>You can now log in with your new password.</p>
              <p style={{ marginTop: '20px', color: '#666' }}>Redirecting to login...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
