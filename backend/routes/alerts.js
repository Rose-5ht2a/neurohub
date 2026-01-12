const express = require('express');
const router = express.Router();

// Simulated alerts data (will be replaced with MongoDB when connected)
let alertsData = [
  {
    id: 1,
    region: 'Île-de-France',
    level: 'yellow',
    phenomenon: 'Pluie-inondation',
    description: 'Risque de fortes pluies et d\'inondations locales',
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    coordinates: { lat: 48.8566, lon: 2.3522 },
    active: true
  },
  {
    id: 2,
    region: 'Provence-Alpes-Côte d\'Azur',
    level: 'orange',
    phenomenon: 'Canicule',
    description: 'Températures élevées attendues',
    startDate: new Date(),
    endDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
    coordinates: { lat: 43.2965, lon: 5.3698 },
    active: true
  },
  {
    id: 3,
    region: 'Bretagne',
    level: 'green',
    phenomenon: 'Aucun',
    description: 'Pas d\'alerte en cours',
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    coordinates: { lat: 48.1173, lon: -1.6778 },
    active: true
  }
];

// Get all active alerts
router.get('/', (req, res) => {
  try {
    const activeAlerts = alertsData.filter(alert => alert.active);
    res.json(activeAlerts);
  } catch (error) {
    console.error('Error fetching alerts:', error.message);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Get alert by region
router.get('/region/:region', (req, res) => {
  try {
    const { region } = req.params;
    const alert = alertsData.find(
      a => a.region.toLowerCase() === region.toLowerCase() && a.active
    );
    
    if (!alert) {
      return res.status(404).json({ error: 'No alert found for this region' });
    }
    
    res.json(alert);
  } catch (error) {
    console.error('Error fetching alert:', error.message);
    res.status(500).json({ error: 'Failed to fetch alert' });
  }
});

// Get alerts by level
router.get('/level/:level', (req, res) => {
  try {
    const { level } = req.params;
    const alerts = alertsData.filter(
      a => a.level.toLowerCase() === level.toLowerCase() && a.active
    );
    
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts by level:', error.message);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Create new alert
router.post('/', (req, res) => {
  try {
    const { region, level, phenomenon, description, startDate, endDate, coordinates } = req.body;
    
    if (!region || !level || !phenomenon || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newAlert = {
      id: alertsData.length + 1,
      region,
      level,
      phenomenon,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      coordinates,
      active: true
    };
    
    alertsData.push(newAlert);
    res.status(201).json(newAlert);
  } catch (error) {
    console.error('Error creating alert:', error.message);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

// Update alert
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const alertIndex = alertsData.findIndex(a => a.id === parseInt(id));
    
    if (alertIndex === -1) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    
    alertsData[alertIndex] = {
      ...alertsData[alertIndex],
      ...req.body,
      id: parseInt(id)
    };
    
    res.json(alertsData[alertIndex]);
  } catch (error) {
    console.error('Error updating alert:', error.message);
    res.status(500).json({ error: 'Failed to update alert' });
  }
});

// Delete alert (soft delete - mark as inactive)
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const alertIndex = alertsData.findIndex(a => a.id === parseInt(id));
    
    if (alertIndex === -1) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    
    alertsData[alertIndex].active = false;
    res.json({ message: 'Alert deleted successfully' });
  } catch (error) {
    console.error('Error deleting alert:', error.message);
    res.status(500).json({ error: 'Failed to delete alert' });
  }
});

module.exports = router;
