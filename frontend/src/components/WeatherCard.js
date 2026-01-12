import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <div className="weather-icon">{weather.icon}</div>
      <h2>{weather.city}</h2>
      <p className="country">{weather.country}</p>
      <div className="temperature">{weather.temperature}°C</div>
      <p className="condition">{weather.condition}</p>
      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity:</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind Speed:</span>
          <span className="value">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
