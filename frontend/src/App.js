import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertBanner from './components/AlertBanner';
import AlertMap from './components/AlertMap';
import AlertLegend from './components/AlertLegend';
import AlertList from './components/AlertList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlerts();
    // Refresh alerts every 60 seconds
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${API_URL}/alerts`);
      if (response.data.success) {
        setAlerts(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Impossible de charger les alertes. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des alertes météorologiques...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <AlertBanner alerts={alerts} />
      
      <div className="container">
        <header className="app-header">
          <h1>🌦️ NeuroHub - Vigilance Météorologique</h1>
          <p className="subtitle">
            Système d'alerte pour les phénomènes météorologiques dangereux
          </p>
        </header>

        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="content-grid">
          <div className="main-content">
            <AlertMap alerts={alerts} />
            <AlertList alerts={alerts} />
          </div>
          
          <div className="sidebar">
            <AlertLegend />
            
            <div className="info-box">
              <h4>ℹ️ À propos</h4>
              <p>
                Ce système permet de visualiser en temps réel les alertes
                météorologiques pour différentes régions du monde virtuel.
              </p>
              <p>
                Les alertes sont classées par niveau de dangerosité et
                mises à jour régulièrement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
