import React from 'react';
import './AlertList.css';

const AlertList = ({ alerts }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'vert':
        return '#28a745';
      case 'jaune':
        return '#ffc107';
      case 'orange':
        return '#fd7e14';
      case 'rouge':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    const levelOrder = { rouge: 0, orange: 1, jaune: 2, vert: 3 };
    return levelOrder[a.level] - levelOrder[b.level];
  });

  return (
    <div className="alert-list">
      <h3>Toutes les Alertes Actives</h3>
      {sortedAlerts.length === 0 ? (
        <p className="no-alerts">Aucune alerte active pour le moment.</p>
      ) : (
        <div className="alert-cards">
          {sortedAlerts.map((alert) => (
            <div key={alert.id} className="alert-card">
              <div className="alert-card-header">
                <h4>{alert.region}</h4>
                <span
                  className="alert-level-badge"
                  style={{ backgroundColor: getLevelColor(alert.level) }}
                >
                  {alert.level}
                </span>
              </div>
              <div className="alert-card-body">
                <div className="alert-type">
                  <span className="alert-icon">🌡️</span>
                  <strong>{alert.type}</strong>
                </div>
                <p className="alert-description">{alert.description}</p>
                <div className="alert-meta">
                  <span className="alert-timestamp">
                    📅 {new Date(alert.timestamp).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertList;
