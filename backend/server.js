const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample weather data for different regions
const weatherData = {
  'paris': {
    id: 1,
    city: 'Paris',
    country: 'France',
    temperature: 15,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: '⛅'
  },
  'tokyo': {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    temperature: 22,
    condition: 'Sunny',
    humidity: 55,
    windSpeed: 8,
    icon: '☀️'
  },
  'new-york': {
    id: 3,
    city: 'New York',
    country: 'USA',
    temperature: 18,
    condition: 'Rainy',
    humidity: 80,
    windSpeed: 15,
    icon: '🌧️'
  },
  'london': {
    id: 4,
    city: 'London',
    country: 'UK',
    temperature: 12,
    condition: 'Cloudy',
    humidity: 75,
    windSpeed: 10,
    icon: '☁️'
  },
  'sydney': {
    id: 5,
    city: 'Sydney',
    country: 'Australia',
    temperature: 25,
    condition: 'Clear',
    humidity: 50,
    windSpeed: 6,
    icon: '🌞'
  }
};

// API Routes

// Get all weather data
app.get('/api/weather', (req, res) => {
  const allWeather = Object.values(weatherData);
  res.json({
    success: true,
    data: allWeather
  });
});

// Get weather for a specific city
app.get('/api/weather/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const weather = weatherData[city];
  
  if (weather) {
    res.json({
      success: true,
      data: weather
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'City not found'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET http://localhost:${PORT}/api/health`);
  console.log(`  GET http://localhost:${PORT}/api/weather`);
  console.log(`  GET http://localhost:${PORT}/api/weather/:city`);
});
