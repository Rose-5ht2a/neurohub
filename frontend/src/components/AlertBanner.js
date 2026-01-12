import React from 'react';
import './AlertBanner.css';

const AlertBanner = ({ alerts }) => {
  // Filter for critical alerts (orange or rouge)
  const criticalAlerts = alerts.filter(
    alert => alert.level === 'orange' || alert.level === 'rouge'
  );

  if (criticalAlerts.length === 0) {
    return null;
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'rouge':
        return '#dc3545';
      case 'orange':
        return '#fd7e14';
      default:
        return '#ffc107';
    }
  };

  return (
    <div className="alert-banner-container">
      {criticalAlerts.map((alert) => (
        <div
          key={alert.id}
          className="alert-banner"
          style={{ backgroundColor: getLevelColor(alert.level) }}
        >
          <div className="alert-banner-content">
            <span className="alert-icon">⚠️</span>
            <span className="alert-text">
              <strong>{alert.region}</strong> - {alert.type}: {alert.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
