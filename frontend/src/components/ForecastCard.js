import React from 'react';
import { getWeatherIconUrl, formatDate } from '../utils/helpers';
import './ForecastCard.css';

const ForecastCard = ({ forecasts }) => {
  if (!forecasts || Object.keys(forecasts).length === 0) {
    return null;
  }

  // Get daily forecasts (using midday data)
  const dailyForecasts = Object.entries(forecasts).map(([date, dayData]) => {
    // Find the forecast closest to midday (12:00)
    const middayForecast = dayData.find(f => f.time.includes('12:00')) || dayData[0];
    
    // Calculate min/max temperatures for the day
    const temps = dayData.map(f => f.temperature);
    const minTemp = Math.round(Math.min(...temps));
    const maxTemp = Math.round(Math.max(...temps));
    
    return {
      date,
      ...middayForecast,
      minTemp,
      maxTemp
    };
  }).slice(0, 5); // Show only 5 days

  return (
    <div className="forecast-container">
      <h3>Prévisions sur 5 jours</h3>
      <div className="forecast-grid">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-date">
              {index === 0 ? 'Aujourd\'hui' : formatDate(forecast.date)}
            </div>
            <img 
              src={getWeatherIconUrl(forecast.icon)}
              alt={forecast.description}
              className="forecast-icon"
            />
            <div className="forecast-description">
              {forecast.description}
            </div>
            <div className="forecast-temp">
              <span className="temp-max">{forecast.maxTemp}°</span>
              <span className="temp-min">{forecast.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
