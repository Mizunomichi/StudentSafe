# Deploy Backend to Render

## Step 1: Create a Render Account
1. Go to https://render.com/
2. Sign up for a free account (you can use your GitHub account)

## Step 2: Deploy Your Backend

1. Click "New +" and select "Web Service"
2. Connect your GitHub repository: `Mizunomichi/StudentSafe`
3. Configure the service:
   - **Name**: `studentsafe-backend` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Instance Type**: `Free`

## Step 3: Add Environment Variables in Render

Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | Your Vercel URL (e.g., `https://student-safe.vercel.app`) |
| `EMAIL_USER` | Your email address for sending notifications |
| `EMAIL_PASSWORD` | Your email app password |
| `PORT` | `5000` (Render will override this automatically) |

**Important**: For Gmail, you need to create an App Password:
- Go to your Google Account settings
- Security → 2-Step Verification → App passwords
- Generate a new app password for "Mail"
- Use that password for `EMAIL_PASSWORD`

## Step 4: Deploy

1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment to complete
3. Copy your backend URL (e.g., `https://studentsafe-backend.onrender.com`)

## Step 5: Update Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your StudentSafe project
3. Go to Settings → Environment Variables
4. Add a new variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api` (replace with your actual Render URL)
5. Redeploy your frontend

## Step 6: Test Your App

Visit your Vercel URL and try logging in with the admin credentials!

---

## Troubleshooting

**If login still fails:**
- Check Render logs for errors
- Verify environment variables are set correctly in both Render and Vercel
- Make sure CORS is allowing your frontend URL

**Free tier limitations:**
- Render free tier spins down after 15 minutes of inactivity
- First request after spindown may take 30-60 seconds
- This is normal for free tier!
