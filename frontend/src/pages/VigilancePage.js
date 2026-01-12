import React, { useState, useEffect } from 'react';
import { vigilanceAPI } from '../services/api';
import AlertForm from '../components/AlertForm';
import '../styles/VigilancePage.css';

function VigilancePage() {
  const [alerts, setAlerts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [alertsResponse, regionsResponse] = await Promise.all([
        vigilanceAPI.getAllAlerts(),
        vigilanceAPI.getAllRegions()
      ]);
      setAlerts(alertsResponse.data);
      setRegions(regionsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des données de vigilance');
      setLoading(false);
    }
  };

  const handleDeleteAlert = async (alertId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?')) {
      try {
        await vigilanceAPI.deleteAlert(alertId);
        setAlerts(alerts.filter(alert => alert.id !== alertId));
      } catch (err) {
        alert('Erreur lors de la suppression de l\'alerte');
      }
    }
  };

  const handleAddAlert = async (alertData) => {
    try {
      const response = await vigilanceAPI.createAlert(alertData);
      setAlerts([...alerts, response.data]);
      setShowForm(false);
    } catch (err) {
      alert('Erreur lors de la création de l\'alerte');
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      'vert': '#4caf50',
      'jaune': '#ffeb3b',
      'orange': '#ff9800',
      'rouge': '#f44336'
    };
    return colors[level] || colors.vert;
  };

  const getLevelBadge = (level) => {
    return (
      <span className="level-badge" style={{ backgroundColor: getLevelColor(level) }}>
        {level.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="vigilance-page">
      <div className="page-header">
        <h1>Vigilance Météorologique</h1>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Annuler' : '+ Ajouter une alerte'}
        </button>
      </div>

      {showForm && (
        <AlertForm onSubmit={handleAddAlert} onCancel={() => setShowForm(false)} />
      )}

      <div className="vigilance-content">
        <section className="regions-section">
          <h2>État de vigilance par région</h2>
          <div className="regions-grid">
            {regions.map(region => (
              <div 
                key={region.id} 
                className="region-card"
                style={{ borderLeft: `4px solid ${getLevelColor(region.vigilanceLevel)}` }}
              >
                <h3>{region.name}</h3>
                {getLevelBadge(region.vigilanceLevel)}
              </div>
            ))}
          </div>
        </section>

        <section className="alerts-section">
          <h2>Alertes en cours ({alerts.length})</h2>
          {alerts.length === 0 ? (
            <p className="no-alerts">Aucune alerte en cours</p>
          ) : (
            <div className="alerts-list">
              {alerts.map(alert => (
                <div key={alert.id} className="alert-card">
                  <div className="alert-header">
                    <div>
                      <h3>{alert.type}</h3>
                      <p className="alert-location">{alert.region} - {alert.department}</p>
                    </div>
                    <div className="alert-actions">
                      {getLevelBadge(alert.level)}
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="alert-description">{alert.description}</p>
                  <div className="alert-period">
                    <span>📅 Du {new Date(alert.startDate).toLocaleString('fr-FR')} </span>
                    <span>au {new Date(alert.endDate).toLocaleString('fr-FR')}</span>
                  </div>
                  {alert.recommendations && alert.recommendations.length > 0 && (
                    <div className="alert-recommendations">
                      <strong>Recommandations:</strong>
                      <ul>
                        {alert.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default VigilancePage;
