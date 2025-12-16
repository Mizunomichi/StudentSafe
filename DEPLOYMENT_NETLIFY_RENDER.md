# Deploy StudentSafe to Netlify + Render

## Part 1: Deploy Backend to Render

### Step 1: Create a Render Account
1. Go to https://render.com/
2. Sign up for a free account (you can use your GitHub account)

### Step 2: Deploy Your Backend

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

### Step 3: Add Environment Variables in Render

Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | Your Netlify URL (e.g., `https://studentsafe.netlify.app`) |
| `EMAIL_USER` | Your email address for sending notifications |
| `EMAIL_PASSWORD` | Your email app password |

**Important**: For Gmail, you need to create an App Password:
- Go to your Google Account settings
- Security → 2-Step Verification → App passwords
- Generate a new app password for "Mail"
- Use that password for `EMAIL_PASSWORD`

### Step 4: Deploy Backend

1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment to complete
3. **Copy your backend URL** (e.g., `https://studentsafe-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Create a Netlify Account
1. Go to https://netlify.com/
2. Sign up for a free account (you can use your GitHub account)

### Step 2: Deploy Your Frontend

1. Click "Add new site" → "Import an existing project"
2. Connect to GitHub and select `Mizunomichi/StudentSafe`
3. Configure build settings (Netlify will auto-detect from netlify.toml):
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`
   - **Branch**: `main`

### Step 3: Add Environment Variables in Netlify

1. Go to Site settings → Environment variables
2. Add a new variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-render-backend-url.onrender.com/api`
   
Replace with your actual Render backend URL from Part 1, Step 4!

### Step 4: Deploy Frontend

1. Click "Deploy site"
2. Wait 2-3 minutes for deployment
3. Copy your Netlify URL (e.g., `https://studentsafe.netlify.app`)

### Step 5: Update Backend with Frontend URL

1. Go back to your Render dashboard
2. Select your backend service
3. Go to Environment → Edit `FRONTEND_URL`
4. Update to your Netlify URL
5. Click "Save Changes" (this will redeploy the backend)

### Step 6: Test Your App

Visit your Netlify URL and try logging in with the admin credentials!

---

## Troubleshooting

**If login still fails:**
- Check Render logs for errors in the backend
- Check Netlify deploy logs for frontend build errors
- Verify environment variables are set correctly in both Render and Netlify
- Make sure CORS is allowing your Netlify URL
- Clear browser cache and try again

**Free tier limitations:**
- **Render**: Spins down after 15 minutes of inactivity, first request may take 30-60 seconds
- **Netlify**: 300 build minutes/month, 100GB bandwidth/month
- Both are sufficient for development and small projects!

**Common Netlify issues:**
- Build fails? Check that `client/package.json` has all dependencies
- Environment variable not working? Redeploy after adding variables
- Getting 404s? The `netlify.toml` redirect rule should fix this
