import React from 'react';
import { getWeatherIconUrl } from '../utils/helpers';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return (
      <div className="weather-card">
        <p>Chargement des données météo...</p>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.city}</h2>
        {weather.country && <span className="country">{weather.country}</span>}
      </div>
      
      <div className="weather-main">
        <img 
          src={getWeatherIconUrl(weather.icon)} 
          alt={weather.description}
          className="weather-icon"
        />
        <div className="temperature">
          <span className="temp-value">{Math.round(weather.temperature)}°</span>
          <span className="temp-unit">C</span>
        </div>
      </div>
      
      <div className="weather-description">
        {weather.description}
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Ressenti</span>
          <span className="detail-value">{Math.round(weather.feelsLike)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidité</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Vent</span>
          <span className="detail-value">{Math.round(weather.windSpeed)} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pression</span>
          <span className="detail-value">{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
