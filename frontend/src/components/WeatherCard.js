import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WeatherCard.css';

function WeatherCard({ city }) {
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
    <div className="weather-card">
      <div className="card-header">
        <h3>{city.name}</h3>
        <p className="region">{city.region}</p>
      </div>
      
      <div className="current-weather">
        <div className="temp-display">
          <span className="icon-large">{getWeatherIcon(current.icon)}</span>
          <div className="temp-info">
            <span className="temperature">{current.temperature}°C</span>
            <span className="condition">{current.condition}</span>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Ressenti</span>
            <span className="detail-value">{current.feelsLike}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidité</span>
            <span className="detail-value">{current.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Vent</span>
            <span className="detail-value">{current.windSpeed} km/h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Précipitations</span>
            <span className="detail-value">{current.precipitation} mm</span>
          </div>
        </div>
      </div>

      <div className="forecast-preview">
        <h4>Prévisions</h4>
        <div className="forecast-days">
          {forecast.slice(0, 3).map((day, index) => (
            <div key={index} className="forecast-day">
              <span className="day-date">{new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
              <span className="day-icon">{getWeatherIcon(day.icon)}</span>
              <span className="day-temp">{day.tempMax}°/{day.tempMin}°</span>
            </div>
          ))}
        </div>
      </div>

      <Link to={`/city/${city.id}`} className="details-link">
        Voir les détails →
      </Link>
    </div>
  );
}

export default WeatherCard;
