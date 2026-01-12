import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AlertBanner.css';

function AlertBanner({ level, count }) {
  const getLevelColor = (level) => {
    const colors = {
      'vert': '#4caf50',
      'jaune': '#ffeb3b',
      'orange': '#ff9800',
      'rouge': '#f44336'
    };
    return colors[level] || colors.vert;
  };

  const getLevelText = (level) => {
    const texts = {
      'vert': 'Pas de vigilance particulière',
      'jaune': 'Vigilance Jaune',
      'orange': 'Vigilance Orange',
      'rouge': 'Vigilance Rouge'
    };
    return texts[level] || texts.vert;
  };

  const getIcon = (level) => {
    if (level === 'vert') return '✓';
    return '⚠️';
  };

  return (
    <div className="alert-banner" style={{ backgroundColor: getLevelColor(level) }}>
      <div className="alert-content">
        <span className="alert-icon">{getIcon(level)}</span>
        <div className="alert-text">
          <strong>{getLevelText(level)}</strong>
          {count > 0 && (
            <span className="alert-count"> - {count} alerte(s) en cours</span>
          )}
        </div>
        {count > 0 && (
          <Link to="/vigilance" className="alert-link">
            Voir les détails
          </Link>
        )}
      </div>
    </div>
  );
}

export default AlertBanner;
