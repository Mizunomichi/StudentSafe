const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { sendEmail, emailTemplates, generateToken } = require('./emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

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

// User storage with email verification
let users = [
  {
    id: 1,
    email: 'zildjiantrixterribo@gmail.com',
    password: 'adminsizild',
    username: 'Admin',
    role: 'admin',
    verified: true,
    createdAt: Date.now()
  }
];
let userIdCounter = 2;
let verificationTokens = {}; // { token: { userId, email, expires } }
let resetTokens = {}; // { token: { userId, email, expires } }

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

// ============ AUTHENTICATION ROUTES ============

// User registration with email verification
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const newUser = {
      id: userIdCounter++,
      email,
      password,
      username,
      role: 'user',
      verified: false,
      createdAt: Date.now()
    };
    users.push(newUser);

    // Generate verification token
    const token = generateToken();
    verificationTokens[token] = {
      userId: newUser.id,
      email: newUser.email,
      expires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };

    // Send welcome & verification email
    const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify?token=${token}`;
    await sendEmail(email, emailTemplates.welcome(username, verificationLink));

    res.json({ 
      success: true, 
      message: 'Registration successful! Please check your email to verify your account.',
      userId: newUser.id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', message: error.message });
  }
});

// User login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(403).json({ error: 'Please verify your email before logging in' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// Verify email
app.get('/api/auth/verify/:token', (req, res) => {
  try {
    const { token } = req.params;
    const tokenData = verificationTokens[token];

    if (!tokenData) {
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    if (tokenData.expires < Date.now()) {
      delete verificationTokens[token];
      return res.status(400).json({ error: 'Verification token expired' });
    }

    // Find and verify user
    const user = users.find(u => u.id === tokenData.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verified = true;
    delete verificationTokens[token];

    res.json({ success: true, message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed', message: error.message });
  }
});

// Request password reset
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Don't reveal if email exists
      return res.json({ success: true, message: 'If that email exists, a reset link has been sent' });
    }

    // Generate reset token
    const token = generateToken();
    resetTokens[token] = {
      userId: user.id,
      email: user.email,
      expires: Date.now() + 60 * 60 * 1000 // 1 hour
    };

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    await sendEmail(email, emailTemplates.passwordReset(user.username, resetLink));

    res.json({ success: true, message: 'If that email exists, a reset link has been sent' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Failed to process password reset', message: error.message });
  }
});

// Reset password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const tokenData = resetTokens[token];
    if (!tokenData) {
      return res.status(400).json({ error: 'Invalid reset token' });
    }

    if (tokenData.expires < Date.now()) {
      delete resetTokens[token];
      return res.status(400).json({ error: 'Reset token expired' });
    }

    // Find and update user password
    const user = users.find(u => u.id === tokenData.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = newPassword;
    delete resetTokens[token];

    // Send confirmation email
    await sendEmail(user.email, emailTemplates.passwordResetSuccess(user.username));

    res.json({ success: true, message: 'Password reset successful! You can now log in.' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Failed to reset password', message: error.message });
  }
});

// Resend verification email
app.post('/api/auth/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.verified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    // Generate new verification token
    const token = generateToken();
    verificationTokens[token] = {
      userId: user.id,
      email: user.email,
      expires: Date.now() + 24 * 60 * 60 * 1000
    };

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify?token=${token}`;
    await sendEmail(email, emailTemplates.verification(user.username, verificationLink));

    res.json({ success: true, message: 'Verification email sent!' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'Failed to resend verification', message: error.message });
  }
});

// Serve React app for all other routes (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`StudentSafe server running on port ${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
  console.log(`Frontend: Serving React app from /client/build`);
});
