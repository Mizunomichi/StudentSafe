# 📧 Email Setup Guide for StudentSafe

## Quick Setup for Gmail

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Under "Select app" → Choose "Mail"
4. Under "Select device" → Choose "Other (Custom name)"
5. Type: "StudentSafe"
6. Click "Generate"
7. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `abcd efgh ijkl mnop` with the app password from Step 2

### Step 4: Test Email Sending

1. Start your backend server:
   ```bash
   npm run dev
   ```

2. Register a new user on http://localhost:3000/login

3. Check your email inbox for the welcome message!

---

## 📧 Email Features Included

### 1. **Welcome Email** ✅
Sent immediately when user signs up:
- Welcome message
- Email verification link (24-hour expiry)
- Feature overview

### 2. **Email Verification** ✅
- Users must verify email before logging in
- Verification link expires in 24 hours
- Can resend verification email if needed

### 3. **Password Reset** ✅
- Forgot password link on login page
- Reset link sent to email (1-hour expiry)
- Confirmation email after successful reset

### 4. **Password Reset Success** ✅
- Confirmation email sent after password change
- Security notice included

---

## 🧪 Testing Email Locally

### Test Registration Flow:
1. Go to http://localhost:3000/login
2. Click "Sign Up"
3. Enter email, username, and password
4. Submit form
5. Check your email for verification link
6. Click verification link
7. Log in with your credentials

### Test Password Reset:
1. Go to http://localhost:3000/login
2. Click "Forgot password?"
3. Enter your email
4. Check email for reset link
5. Click link and enter new password
6. Check email for confirmation

---

## 🚀 Production Deployment

For production on Render/Vercel, add these environment variables in your Render dashboard:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=https://your-app.vercel.app
```

---

## ⚠️ Troubleshooting

### "Invalid login" error:
- Make sure 2-Factor Authentication is enabled
- Use App Password, not your regular Gmail password
- Remove spaces from the app password

### Emails not sending:
- Check `.env` file exists and has correct values
- Verify EMAIL_USER and EMAIL_PASSWORD are set
- Check server console for error messages
- Make sure nodemailer is installed: `npm install nodemailer`

### Email going to spam:
- Check your email's spam folder
- Add your sending email to contacts
- In production, consider using SendGrid or AWS SES

---

## 📋 Admin Credentials

**Admin Account:**
- Email: `zildjiantrixterribo@gmail.com`
- Password: `adminsizild`
- Already verified and ready to use!

---

## 🔐 Security Best Practices

✅ Never commit `.env` file to git (it's in `.gitignore`)  
✅ Use different app passwords for different applications  
✅ Rotate app passwords regularly  
✅ In production, use dedicated email service providers  

---

Need help? Check the logs or create an issue on GitHub!
