const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather by city name
router.get('/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `${OPENWEATHER_BASE_URL}/weather`,
      {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'fr'
        }
      }
    );
    
    res.json({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      windSpeed: response.data.wind.speed,
      coordinates: response.data.coord
    });
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get forecast by city name (5 days)
router.get('/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `${OPENWEATHER_BASE_URL}/forecast`,
      {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'fr'
        }
      }
    );
    
    // Group forecasts by day
    const forecasts = response.data.list.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        time: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed
      });
      return acc;
    }, {});
    
    res.json({
      city: response.data.city.name,
      country: response.data.city.country,
      forecasts
    });
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch forecast data',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get weather by coordinates
router.get('/coordinates', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    
    const response = await axios.get(
      `${OPENWEATHER_BASE_URL}/weather`,
      {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'fr'
        }
      }
    );
    
    res.json({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      windSpeed: response.data.wind.speed,
      coordinates: response.data.coord
    });
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.response?.data?.message || error.message 
    });
  }
});

module.exports = router;
