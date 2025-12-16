# Deploy StudentSafe to Render (Single Site Deployment)

Your app is now configured to run both frontend and backend from a single server! The Express server serves the React build files, so you only need **one deployment**.

---

## 🚀 Deploy to Render

### Step 1: Create a Render Account
1. Go to https://render.com/
2. Sign up for a free account (use your GitHub account for easy setup)

### Step 2: Create a New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Mizunomichi/StudentSafe`
3. Click **"Connect"**

### Step 3: Configure Your Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `studentsafe` (or any name you prefer) |
| **Region** | Choose closest to your location |
| **Branch** | `main` |
| **Root Directory** | Leave empty |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 4: Add Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `EMAIL_USER` | Your Gmail address (e.g., `your-email@gmail.com`) |
| `EMAIL_PASSWORD` | Your Gmail App Password (see below) |
| `NODE_ENV` | `production` |

#### How to Get Gmail App Password:
1. Go to your Google Account → Security
2. Enable **2-Step Verification** (if not enabled)
3. Go to **App passwords** (search for it in settings)
4. Select "Mail" and "Other (Custom name)"
5. Name it "StudentSafe" and click **Generate**
6. Copy the 16-character password and use it for `EMAIL_PASSWORD`

### Step 5: Deploy!

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for the build and deployment
3. Render will:
   - Install backend dependencies
   - Install frontend dependencies
   - Build your React app
   - Start the Express server
   - Serve everything from one URL!

### Step 6: Get Your URL

Once deployed, Render gives you a URL like:
```
https://studentsafe.onrender.com
```

This URL serves **both** your frontend and API! 

- Frontend: `https://studentsafe.onrender.com`
- API: `https://studentsafe.onrender.com/api/health`

### Step 7: Update Environment Variable (Important!)

Now that you have your Render URL, update one more environment variable:

1. In Render dashboard → Your service → **Environment**
2. Add or edit:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://studentsafe.onrender.com` (use your actual URL)
3. Click **"Save Changes"**

This triggers a redeploy, wait a couple minutes for it to finish.

### Step 8: Test Your App!

Visit your Render URL and try:
- ✅ View the map
- ✅ Report an incident
- ✅ Login with admin credentials:
  - Email: `zildjiantrixterribo@gmail.com`
  - Password: `adminsizild`
- ✅ Register a new user (check email for verification)

---

## 🔄 Automatic Deployments

Every time you push to GitHub, Render automatically redeploys your app!

```bash
git add .
git commit -m "feat: update something"
git push
# Render automatically detects and deploys! 🚀
```

---

## 🐛 Troubleshooting

### Build fails?
- Check Render logs: Dashboard → Your Service → Logs
- Make sure all dependencies are in `package.json` files
- Verify Build Command: `npm install && npm run build`

### Login not working?
- Check environment variables are set correctly
- Make sure `FRONTEND_URL` matches your Render URL
- Check CORS settings in server logs

### Site loads but API fails?
- Verify Start Command: `npm start`
- Check that `server/index.js` is serving the build folder
- Look for errors in Render logs

### Email verification not working?
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Make sure you're using an App Password, not your regular password
- Check Gmail hasn't blocked the app

### First request is slow?
- **Normal!** Free tier spins down after 15 minutes of inactivity
- First request after spindown takes 30-60 seconds
- Subsequent requests are fast

---

## 📊 Free Tier Limits

Render free tier includes:
- ✅ 750 hours/month (enough for 1 always-on service)
- ✅ Automatic HTTPS
- ✅ Continuous deployment from Git
- ⚠️ Spins down after 15 min of inactivity
- ⚠️ 512 MB RAM

Perfect for development and small projects!

---

## 🎉 You're Done!

Your app is now live with:
- ✨ Single deployment (no need for 2 sites!)
- 🔄 Automatic deployments from GitHub
- 🔒 HTTPS enabled
- 📧 Email verification working
- 🗺️ Interactive map with real-time incidents

Share your URL with friends and start making your community safer! 🛡️

**Need help?** Check the Render documentation or open an issue on GitHub.
