const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data
const weatherDataPath = path.join(__dirname, '../data/weather-data.json');
const vigilanceDataPath = path.join(__dirname, '../data/vigilance-data.json');

let weatherData = JSON.parse(fs.readFileSync(weatherDataPath, 'utf8'));
let vigilanceData = JSON.parse(fs.readFileSync(vigilanceDataPath, 'utf8'));

// Helper function to save vigilance data
const saveVigilanceData = () => {
  fs.writeFileSync(vigilanceDataPath, JSON.stringify(vigilanceData, null, 2));
};

// Routes

// Get all cities weather data
app.get('/api/weather', (req, res) => {
  res.json(weatherData);
});

// Get weather data for a specific city
app.get('/api/weather/:cityId', (req, res) => {
  const city = weatherData.cities.find(c => c.id === req.params.cityId);
  if (city) {
    res.json(city);
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

// Get all vigilance alerts
app.get('/api/vigilance/alerts', (req, res) => {
  res.json(vigilanceData.alerts);
});

// Get alerts for a specific region
app.get('/api/vigilance/alerts/:region', (req, res) => {
  const regionAlerts = vigilanceData.alerts.filter(
    alert => alert.region.toLowerCase().replace(/\s+/g, '-') === req.params.region.toLowerCase()
  );
  res.json(regionAlerts);
});

// Get all regions vigilance status
app.get('/api/vigilance/regions', (req, res) => {
  res.json(vigilanceData.regions);
});

// Get specific region vigilance status
app.get('/api/vigilance/regions/:regionId', (req, res) => {
  const region = vigilanceData.regions.find(r => r.id === req.params.regionId);
  if (region) {
    res.json(region);
  } else {
    res.status(404).json({ error: 'Region not found' });
  }
});

// Add a new alert (POST)
app.post('/api/vigilance/alerts', (req, res) => {
  const newAlert = {
    id: `alert-${Date.now()}`,
    ...req.body
  };
  vigilanceData.alerts.push(newAlert);
  saveVigilanceData();
  res.status(201).json(newAlert);
});

// Update an alert (PUT)
app.put('/api/vigilance/alerts/:id', (req, res) => {
  const index = vigilanceData.alerts.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    vigilanceData.alerts[index] = {
      ...vigilanceData.alerts[index],
      ...req.body
    };
    saveVigilanceData();
    res.json(vigilanceData.alerts[index]);
  } else {
    res.status(404).json({ error: 'Alert not found' });
  }
});

// Delete an alert (DELETE)
app.delete('/api/vigilance/alerts/:id', (req, res) => {
  const index = vigilanceData.alerts.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    vigilanceData.alerts.splice(index, 1);
    saveVigilanceData();
    res.json({ message: 'Alert deleted successfully' });
  } else {
    res.status(404).json({ error: 'Alert not found' });
  }
});

// Update region vigilance level (PUT)
app.put('/api/vigilance/regions/:regionId', (req, res) => {
  const region = vigilanceData.regions.find(r => r.id === req.params.regionId);
  if (region) {
    region.vigilanceLevel = req.body.vigilanceLevel;
    saveVigilanceData();
    res.json(region);
  } else {
    res.status(404).json({ error: 'Region not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
