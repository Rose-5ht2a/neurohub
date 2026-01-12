# Quick Start Guide - Météo France

Get up and running in 5 minutes!

## 🚀 Quick Install

### 1. Clone the Repository
```bash
git clone https://github.com/Rose-5ht2a/neurohub.git
cd neurohub
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key:
# OPENWEATHER_API_KEY=your_key_here
npm run dev
```

Backend will start on http://localhost:5000

### 3. Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Frontend will start on http://localhost:3000

### 4. Open in Browser
Navigate to http://localhost:3000

## 🔑 Get an OpenWeatherMap API Key

1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to "API keys" section
4. Copy your API key
5. Paste it in `backend/.env` as `OPENWEATHER_API_KEY=your_key_here`

## ✅ Verify Installation

Test the backend API:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","message":"Weather API is running"}
```

Test alerts endpoint:
```bash
curl http://localhost:5000/api/alerts
```

## 🎯 What You'll See

1. **Header** - Search bar to look up any city
2. **Alert Banner** - Shows active weather alerts with color coding
3. **Current Weather** - Temperature, humidity, wind, and conditions
4. **5-Day Forecast** - Daily weather predictions
5. **Interactive Map** - Click on markers to see regional alerts

## 🎨 Alert Colors

- 🟢 **Green** - No alerts, safe weather
- 🟡 **Yellow** - Be aware, minor weather issues
- 🟠 **Orange** - Be very vigilant, significant weather event
- 🔴 **Red** - Maximum alert, dangerous conditions

## 📱 Try These Features

1. **Search for a city**: Type "Lyon" or "Marseille" in the search bar
2. **View map markers**: Click on colored dots on the map
3. **Check forecasts**: Scroll down to see 5-day predictions
4. **View alerts**: See alert banner at top if any active alerts

## 🛠️ Common Issues

**"Cannot connect to backend"**
- Make sure backend server is running on port 5000
- Check `frontend/.env` has correct API URL

**"Weather data not loading"**
- Verify OpenWeatherMap API key is set in `backend/.env`
- Check API key is valid and active

**"Port already in use"**
- Backend: Change PORT in `backend/.env`
- Frontend: Set PORT environment variable: `PORT=3001 npm start`

## 📚 Next Steps

- Read [README.md](README.md) for detailed features
- Check [API.md](API.md) for API documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## 🎉 You're Ready!

Start exploring French weather data and alerts! The application includes sample alerts for Île-de-France, Provence-Alpes-Côte d'Azur, Bretagne, and Normandie.

For questions or issues, check the main README or open a GitHub issue.

Happy weather tracking! ☀️🌧️⛈️❄️
