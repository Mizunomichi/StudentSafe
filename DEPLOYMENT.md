# 🚀 Deployment Guide for StudentSafe

## 📱 Progressive Web App (PWA) - ✅ DONE!

Your app is now installable! Users can:
1. Open the app in their mobile browser
2. Tap the menu (⋮) or share button
3. Select "Add to Home Screen"
4. Use it like a native app!

---

## 🌐 Deploy to Production

### Step 1: Deploy Backend to Render

1. **Go to [render.com](https://render.com)** and sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select the **StudentSafe** repository

3. **Configure Settings:**
   ```
   Name: studentsafe-api (or your preferred name)
   Region: Choose closest to your users
   Branch: main
   Root Directory: (leave blank)
   Runtime: Node
   Build Command: npm install
   Start Command: node server/index.js
   ```

4. **Add Environment Variables:**
   - Click "Environment" tab
   - Add:
     ```
     NODE_ENV = production
     FRONTEND_URL = https://your-app.vercel.app (add after deploying frontend)
     ```

5. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Copy your backend URL: `https://studentsafe-api.onrender.com`

---

### Step 2: Deploy Frontend to Netlify

1. **Go to [netlify.com](https://netlify.com)** and sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your **StudentSafe** repository

3. **Configure Settings:**
   ```
   Framework Preset: Create React App
   Root Directory: client
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL = https://studentsafe-api.onrender.com/api
     ```
   - Replace with YOUR Render backend URL from Step 1

5. **Deploy!**
   - Click "Deploy"
   - Wait for build (2-3 minutes)
   - Your app is live! Copy the URL: `https://studentsafe.netlify.app`

---

### Step 3: Update CORS (Important!)

1. **Go back to Render dashboard**
2. **Update Environment Variables:**
   ```
   FRONTEND_URL = https://studentsafe.netlify.app
   ```
   (Use YOUR actual Netlify URL)

3. **Redeploy backend** (Render will auto-redeploy when you save env vars)

---

### Step 4: Test Your Deployed App! 🎉

1. **Open your Netlify URL** in any browser
2. **Test on your phone:**
   - Open the URL on your phone
   - Tap menu → "Add to Home Screen"
   - Now you have a native-like app!

---

## 📱 Accessing on Your Phone

### Method 1: Direct Browser Access
Just open your Netlify URL: `https://studentsafe.netlify.app`

### Method 2: Install as PWA (Recommended)
**iPhone:**
1. Open in Safari
2. Tap share button (□↑)
3. Scroll and tap "Add to Home Screen"
4. Name it "StudentSafe"
5. Tap "Add"

**Android:**
1. Open in Chrome
2. Tap menu (⋮)
3. Tap "Add to Home screen" or "Install app"
4. Tap "Install"

---

## 🔄 Future Updates

When you make changes:

```bash
# Commit and push to GitHub
git add .
git commit -m "Your update message"
git push

# Both Netlify and Render will auto-deploy! 🚀
```

---

## 🆓 Free Tier Limits

**Render (Backend):**
- ✅ Free forever
- ⚠️ Server sleeps after 15 min of inactivity (first request takes ~30 seconds)
- 750 hours/month

**Netlify (Frontend):**
- ✅ Free forever for personal projects
- 100GB bandwidth/month
- Unlimited projects

---

## 🎯 Your App URLs

After deployment, update these in your README:

```markdown
🌐 **Live Demo**: https://studentsafe.netlify.app
📡 **API**: https://studentsafe-api.onrender.com/api
```

---

## 🐛 Troubleshooting

**Backend not connecting?**
- Check CORS settings in Render env vars
- Verify API URL in Netlify env vars
- Check Render logs for errors

**PWA not installing?**
- Make sure you're using HTTPS (Netlify provides this)
- Check browser compatibility
- Verify manifest.json is loading

**Frontend shows errors?**
- Check browser console (F12)
- Verify environment variables in Netlify
- Check if backend is awake (visit API health endpoint)

---

**Need help?** Check Render and Netlify docs or open an issue on GitHub!

🎉 **Congratulations! Your app is now live and installable!**
