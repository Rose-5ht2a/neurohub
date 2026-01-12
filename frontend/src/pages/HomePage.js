import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { weatherAPI, vigilanceAPI } from '../services/api';
import WeatherCard from '../components/WeatherCard';
import AlertBanner from '../components/AlertBanner';
import '../styles/HomePage.css';

function HomePage() {
  const [cities, setCities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherResponse, alertsResponse] = await Promise.all([
          weatherAPI.getAllCities(),
          vigilanceAPI.getAllAlerts()
        ]);
        setCities(weatherResponse.data.cities);
        setAlerts(alertsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données météo');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des données météo...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const highestAlertLevel = alerts.reduce((highest, alert) => {
    const levels = { 'vert': 0, 'jaune': 1, 'orange': 2, 'rouge': 3 };
    return levels[alert.level] > levels[highest] ? alert.level : highest;
  }, 'vert');

  return (
    <div className="home-page">
      <AlertBanner level={highestAlertLevel} count={alerts.length} />
      
      <section className="hero">
        <h2>Conditions météorologiques actuelles</h2>
        <p className="subtitle">Dernière mise à jour: {new Date().toLocaleString('fr-FR')}</p>
      </section>

      <section className="cities-grid">
        {cities.map(city => (
          <WeatherCard key={city.id} city={city} />
        ))}
      </section>

      <section className="quick-links">
        <Link to="/map" className="quick-link-card">
          <span className="icon">🗺️</span>
          <h3>Carte Interactive</h3>
          <p>Visualisez les conditions météo par région</p>
        </Link>
        <Link to="/vigilance" className="quick-link-card">
          <span className="icon">⚠️</span>
          <h3>Vigilance Météo</h3>
          <p>Consultez les alertes en cours</p>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
