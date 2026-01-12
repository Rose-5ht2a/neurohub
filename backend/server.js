const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for alerts
let alerts = [
  {
    id: 1,
    region: 'Nord',
    level: 'orange',
    type: 'Vents violents',
    description: 'Vents violents attendus avec des rafales jusqu\'à 100 km/h',
    coordinates: { lat: 50.6292, lng: 3.0573 },
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    region: 'Sud',
    level: 'jaune',
    type: 'Fortes chaleurs',
    description: 'Températures élevées prévues, restez hydraté',
    coordinates: { lat: 43.2965, lng: 5.3698 },
    timestamp: new Date().toISOString()
  }
];

let nextId = 3;

// GET /alerts - Retrieve all weather alerts
app.get('/alerts', (req, res) => {
  res.json({
    success: true,
    data: alerts,
    count: alerts.length
  });
});

// GET /alerts/:id - Retrieve a specific alert
app.get('/alerts/:id', (req, res) => {
  const alertId = parseInt(req.params.id);
  const alert = alerts.find(a => a.id === alertId);
  
  if (!alert) {
    return res.status(404).json({
      success: false,
      message: 'Alert not found'
    });
  }
  
  res.json({
    success: true,
    data: alert
  });
});

// POST /alerts - Create or update weather alerts
app.post('/alerts', (req, res) => {
  const { region, level, type, description, coordinates } = req.body;
  
  // Validation
  if (!region || !level || !type || !description) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: region, level, type, description'
    });
  }
  
  // Valid levels
  const validLevels = ['vert', 'jaune', 'orange', 'rouge'];
  if (!validLevels.includes(level)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid level. Must be one of: vert, jaune, orange, rouge'
    });
  }
  
  // Check if alert already exists for this region
  const existingAlertIndex = alerts.findIndex(a => a.region === region);
  
  if (existingAlertIndex !== -1) {
    // Update existing alert
    alerts[existingAlertIndex] = {
      ...alerts[existingAlertIndex],
      level,
      type,
      description,
      coordinates: coordinates || alerts[existingAlertIndex].coordinates,
      timestamp: new Date().toISOString()
    };
    
    return res.json({
      success: true,
      message: 'Alert updated',
      data: alerts[existingAlertIndex]
    });
  } else {
    // Create new alert
    const newAlert = {
      id: nextId++,
      region,
      level,
      type,
      description,
      coordinates: coordinates || { lat: 0, lng: 0 },
      timestamp: new Date().toISOString()
    };
    
    alerts.push(newAlert);
    
    return res.status(201).json({
      success: true,
      message: 'Alert created',
      data: newAlert
    });
  }
});

// PUT /alerts/:id - Update a specific alert
app.put('/alerts/:id', (req, res) => {
  const alertId = parseInt(req.params.id);
  const alertIndex = alerts.findIndex(a => a.id === alertId);
  
  if (alertIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Alert not found'
    });
  }
  
  const { region, level, type, description, coordinates } = req.body;
  
  // Validation
  if (level) {
    const validLevels = ['vert', 'jaune', 'orange', 'rouge'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid level. Must be one of: vert, jaune, orange, rouge'
      });
    }
  }
  
  // Update alert
  alerts[alertIndex] = {
    ...alerts[alertIndex],
    ...(region && { region }),
    ...(level && { level }),
    ...(type && { type }),
    ...(description && { description }),
    ...(coordinates && { coordinates }),
    timestamp: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Alert updated',
    data: alerts[alertIndex]
  });
});

// DELETE /alerts/:id - Delete a specific alert
app.delete('/alerts/:id', (req, res) => {
  const alertId = parseInt(req.params.id);
  const alertIndex = alerts.findIndex(a => a.id === alertId);
  
  if (alertIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Alert not found'
    });
  }
  
  const deletedAlert = alerts.splice(alertIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Alert deleted',
    data: deletedAlert
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`NeuroHub Backend API running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}`);
});
