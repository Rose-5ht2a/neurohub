# Deployment Guide - Météo France

## 📦 Production Deployment

### Prerequisites

- Node.js (v14+) installed on the server
- MongoDB instance (local or cloud like MongoDB Atlas)
- OpenWeatherMap API key
- Domain name configured (optional)

### Backend Deployment

#### 1. Prepare Environment

```bash
cd backend
npm install --production
```

#### 2. Configure Environment Variables

Create `.env` file with production values:

```env
PORT=5000
MONGODB_URI=mongodb://your-mongodb-host:27017/meteo-france
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/meteo-france

OPENWEATHER_API_KEY=your_actual_api_key_here
```

#### 3. Start with PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the server
pm2 start server.js --name meteo-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

#### 4. Alternative: Using systemd

Create `/etc/systemd/system/meteo-backend.service`:

```ini
[Unit]
Description=Meteo France Backend
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/neurohub/backend
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable meteo-backend
sudo systemctl start meteo-backend
```

### Frontend Deployment

#### 1. Build for Production

```bash
cd frontend

# Set the API URL in .env
echo "REACT_APP_API_URL=https://your-api-domain.com/api" > .env

# Build the app
npm run build
```

#### 2. Deploy Static Files

**Option A: Using Nginx**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/neurohub/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Option B: Using Apache**

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/neurohub/frontend/build

    <Directory /path/to/neurohub/frontend/build>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    ProxyPass /api http://localhost:5000/api
    ProxyPassReverse /api http://localhost:5000/api
</VirtualHost>
```

**Option C: Static Hosting Services**

Deploy `frontend/build` folder to:
- **Netlify**: Connect GitHub repo, build command: `cd frontend && npm run build`, publish directory: `frontend/build`
- **Vercel**: Similar configuration
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: Upload build folder to S3 bucket

#### 3. Configure CORS

If frontend and backend are on different domains, update backend CORS:

```javascript
// backend/server.js
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

### Database Setup (MongoDB)

#### Option 1: Local MongoDB

```bash
# Install MongoDB
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Add database user
4. Whitelist your server IP
5. Get connection string and update `.env`

### SSL Certificate (HTTPS)

Using Let's Encrypt with Certbot:

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

### Environment Variables Summary

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/meteo-france
OPENWEATHER_API_KEY=your_openweathermap_api_key
NODE_ENV=production
```

**Frontend (.env)**
```env
REACT_APP_API_URL=https://your-domain.com/api
```

### Monitoring and Logs

**With PM2:**
```bash
# View logs
pm2 logs meteo-backend

# Monitor
pm2 monit

# Restart
pm2 restart meteo-backend
```

**With systemd:**
```bash
# View logs
sudo journalctl -u meteo-backend -f

# Restart
sudo systemctl restart meteo-backend
```

### Backup Strategy

1. **MongoDB Backup**
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/meteo-france" --out=/backup/meteo-$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/meteo-france" /backup/meteo-20240101/meteo-france
```

2. **Application Code**
```bash
# Use Git tags for releases
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

### Performance Optimization

1. **Enable Gzip Compression** (Nginx)
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

2. **Enable Caching** (Nginx)
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

3. **Use CDN** for static assets

### Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Set secure environment variables
- [ ] Enable rate limiting on API
- [ ] Use helmet.js for Express security headers
- [ ] Keep dependencies updated
- [ ] Use strong MongoDB passwords
- [ ] Restrict MongoDB network access
- [ ] Enable firewall rules
- [ ] Regular backups

### Troubleshooting

**Server won't start:**
- Check logs: `pm2 logs` or `journalctl -u meteo-backend`
- Verify port 5000 is not in use: `lsof -i :5000`
- Check .env file exists and has correct values

**MongoDB connection issues:**
- Verify MongoDB is running: `sudo systemctl status mongodb`
- Check connection string format
- Verify network access/firewall rules

**Frontend can't reach API:**
- Verify CORS configuration
- Check API URL in frontend .env
- Test API directly: `curl http://your-domain.com/api/health`

### Updates and Maintenance

```bash
# Pull latest changes
git pull origin main

# Update backend
cd backend
npm install
pm2 restart meteo-backend

# Update frontend
cd frontend
npm install
npm run build
# Copy build files to web server directory
```

## 🔗 Additional Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Deployment](https://create-react-app.dev/docs/deployment/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
