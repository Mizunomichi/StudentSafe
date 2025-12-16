import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const API_URL = process.env.REACT_APP_API_URL || '/api';
        const response = await fetch(`${API_URL}/auth/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Connection error. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

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
            <h2>Email Verification</h2>
          </div>

          <div style={{ padding: '40px 30px', textAlign: 'center' }}>
            {status === 'verifying' && (
              <>
                <div className="loading-spinner" style={{ fontSize: '3em', marginBottom: '20px' }}>⏳</div>
                <p>Verifying your email...</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div style={{ fontSize: '3em', marginBottom: '20px' }}>✅</div>
                <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>Verification Successful!</h3>
                <p>{message}</p>
                <p style={{ marginTop: '20px', color: '#666' }}>Redirecting to login...</p>
              </>
            )}

            {status === 'error' && (
              <>
                <div style={{ fontSize: '3em', marginBottom: '20px' }}>❌</div>
                <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>Verification Failed</h3>
                <p>{message}</p>
                <button 
                  className="btn-login" 
                  onClick={() => navigate('/login')}
                  style={{ marginTop: '20px' }}
                >
                  Return to Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
