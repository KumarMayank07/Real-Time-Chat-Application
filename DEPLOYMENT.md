# Messagify Deployment Guide

This guide covers deploying the Messagify chat application to various platforms. The application consists of a React frontend and Node.js backend that need to be deployed separately.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Database Setup](#database-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- **MongoDB Atlas account** (for database)
- **Cloudinary account** (for image uploads)
- **GitHub repository** with your code
- **Domain name** (optional, for custom domains)

## Environment Variables

### Backend Environment Variables

Create these environment variables in your deployment platform:

```env
# Required
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/messagify
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Cloudinary (Required for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend Environment Variables

```env
# Required
VITE_API_URL=https://your-backend-domain.com
VITE_SOCKET_URL=https://your-backend-domain.com
```

## Backend Deployment

### Option 1: Render (Recommended)

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` directory

2. **Configure Service**
   ```yaml
   Name: Messagify-backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Set Environment Variables**
   - Add all backend environment variables listed above
   - Generate a strong JWT_SECRET (32+ characters)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL (e.g., `https://messagify-backend.onrender.com`)

### Option 2: Railway

1. **Deploy from GitHub**
   - Go to [Railway](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Choose the `backend` directory

2. **Configure**
   - Railway auto-detects Node.js
   - Add environment variables in the Variables tab
   - Deploy automatically starts

### Option 3: Heroku

1. **Create App**
   ```bash
   heroku create Messagify-backend
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret
   # Add other environment variables
   ```

2. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

2. **Configure Build**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-domain.com
   VITE_SOCKET_URL=https://your-backend-domain.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be available at `https://your-app.vercel.app`

### Option 2: Netlify

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Set base directory to `frontend`

2. **Configure Build**
   ```
   Build command: npm run build
   Publish directory: frontend/dist
   ```

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add VITE_API_URL and VITE_SOCKET_URL

### Option 3: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Project**
   ```bash
   cd frontend
   firebase init hosting
   # Choose dist as public directory
   # Configure as SPA (Yes)
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster (free tier available)
   - Choose a region close to your backend deployment

2. **Configure Access**
   - Create a database user
   - Add IP addresses to whitelist (0.0.0.0/0 for all IPs)
   - Get connection string

3. **Connection String Format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/messagify?retryWrites=true&w=majority
   ```

## Deployment Checklist

### Before Deployment

- [ ] All environment variables configured
- [ ] MongoDB Atlas cluster created and configured
- [ ] Cloudinary account set up
- [ ] Repository pushed to GitHub
- [ ] Build scripts working locally

### Backend Deployment

- [ ] Backend deployed successfully
- [ ] Environment variables set
- [ ] Health check endpoint working
- [ ] Database connection established
- [ ] CORS configured for frontend domain

### Frontend Deployment

- [ ] Frontend deployed successfully
- [ ] Environment variables pointing to backend
- [ ] SPA routing configured
- [ ] API calls working
- [ ] Socket.IO connection established

### Post-Deployment

- [ ] Test user registration
- [ ] Test login/logout
- [ ] Test real-time messaging
- [ ] Test image uploads
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)

## Troubleshooting

### Common Issues

#### "Missing script: build" Error
```bash
# Add to package.json scripts:
"build": "echo 'No build step required'"
```

#### CORS Errors
```javascript
// Update backend CORS configuration
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true,
}));
```

#### Socket.IO Connection Issues
```javascript
// Update frontend socket connection
const socket = io('https://your-backend-domain.com', {
  transports: ['websocket', 'polling']
});
```

#### Environment Variables Not Working
- Ensure variables start with `VITE_` for frontend
- Restart deployment after adding variables
- Check variable names for typos

### Debugging Steps

1. **Check Deployment Logs**
   - Review build and runtime logs
   - Look for error messages

2. **Test API Endpoints**
   ```bash
   curl https://your-backend-domain.com/api/auth/check
   ```

3. **Verify Environment Variables**
   - Check if all required variables are set
   - Ensure no trailing spaces or quotes

4. **Test Database Connection**
   - Verify MongoDB Atlas IP whitelist
   - Check connection string format

## Support

If you encounter issues:

1. Check the deployment platform's documentation
2. Review error logs carefully
3. Ensure all environment variables are correctly set
4. Test locally first to isolate deployment-specific issues

---

**Happy Deploying! **
