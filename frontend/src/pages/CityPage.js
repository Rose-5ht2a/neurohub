import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { weatherAPI } from '../services/api';
import '../styles/CityPage.css';

function CityPage() {
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await weatherAPI.getCityWeather(cityId);
        setCity(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données de la ville');
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityId]);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error || !city) {
    return (
      <div className="error-container">
        <p className="error">{error || 'Ville non trouvée'}</p>
        <Link to="/" className="back-link">← Retour à l'accueil</Link>
      </div>
    );
  }

  const getWeatherIcon = (icon) => {
    const icons = {
      'sunny': '☀️',
      'partly-cloudy': '⛅',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'drizzle': '🌦️',
      'stormy': '⛈️',
      'snowy': '❄️',
      'foggy': '🌫️'
    };
    return icons[icon] || '🌤️';
  };

  const { current, forecast } = city;

  return (
    <div className="city-page">
      <div className="breadcrumb">
        <Link to="/">Accueil</Link> / <span>{city.name}</span>
      </div>

      <div className="city-header">
        <div>
          <h1>{city.name}</h1>
          <p className="region-name">{city.region}</p>
        </div>
        <div className="coordinates">
          <small>📍 {city.coordinates.lat.toFixed(4)}°N, {city.coordinates.lon.toFixed(4)}°E</small>
        </div>
      </div>

      <div className="current-conditions">
        <h2>Conditions actuelles</h2>
        <div className="current-grid">
          <div className="main-condition">
            <span className="large-icon">{getWeatherIcon(current.icon)}</span>
            <div className="main-temp">
              <span className="temp-value">{current.temperature}°C</span>
              <span className="condition-text">{current.condition}</span>
            </div>
          </div>

          <div className="detailed-conditions">
            <div className="condition-row">
              <div className="condition-item">
                <span className="label">Ressenti</span>
                <span className="value">{current.feelsLike}°C</span>
              </div>
              <div className="condition-item">
                <span className="label">Humidité</span>
                <span className="value">{current.humidity}%</span>
              </div>
            </div>
            <div className="condition-row">
              <div className="condition-item">
                <span className="label">Vent</span>
                <span className="value">{current.windSpeed} km/h {current.windDirection}</span>
              </div>
              <div className="condition-item">
                <span className="label">Précipitations</span>
                <span className="value">{current.precipitation} mm</span>
              </div>
            </div>
            <div className="condition-row">
              <div className="condition-item">
                <span className="label">Pression</span>
                <span className="value">{current.pressure} hPa</span>
              </div>
              <div className="condition-item">
                <span className="label">Couverture nuageuse</span>
                <span className="value">{current.cloudCover}%</span>
              </div>
            </div>
            <div className="condition-row">
              <div className="condition-item">
                <span className="label">Visibilité</span>
                <span className="value">{current.visibility} km</span>
              </div>
              <div className="condition-item">
                <span className="label">Indice UV</span>
                <span className="value">{current.uvIndex}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="forecast-section">
        <h2>Prévisions sur 5 jours</h2>
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-date">
                <strong>{new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}</strong>
                <span>{new Date(day.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
              </div>
              <div className="forecast-icon">
                {getWeatherIcon(day.icon)}
              </div>
              <div className="forecast-temps">
                <span className="temp-max">{day.tempMax}°C</span>
                <span className="temp-min">{day.tempMin}°C</span>
              </div>
              <div className="forecast-condition">
                {day.condition}
              </div>
              <div className="forecast-precipitation">
                💧 {day.precipitation}% de précipitations
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityPage;
