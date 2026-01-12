import React from 'react';
import { getAlertLevelConfig } from '../utils/helpers';
import './AlertBanner.css';

const AlertBanner = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  // Get the highest level alert
  const alertPriority = { red: 4, orange: 3, yellow: 2, green: 1 };
  const highestAlert = alerts.reduce((prev, current) => {
    return alertPriority[current.level] > alertPriority[prev.level] ? current : prev;
  });

  const config = getAlertLevelConfig(highestAlert.level);

  return (
    <div 
      className="alert-banner"
      style={{ 
        backgroundColor: config.bgColor,
        borderColor: config.color
      }}
    >
      <div className="alert-banner-content">
        <div className="alert-icon" style={{ backgroundColor: config.color }}>
          ⚠️
        </div>
        <div className="alert-text">
          <strong>Vigilance {config.name}</strong>
          <span> - {highestAlert.phenomenon}</span>
          <p>{highestAlert.description}</p>
        </div>
        <div className="alert-count">
          {alerts.length > 1 && (
            <span className="badge">{alerts.length} alertes actives</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
