import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AlertMap.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const AlertMap = ({ alerts }) => {
  // Default center on France
  const center = [46.603354, 1.888334];

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

  const getLevelRadius = (level) => {
    switch (level) {
      case 'rouge':
        return 50000;
      case 'orange':
        return 40000;
      case 'jaune':
        return 30000;
      default:
        return 20000;
    }
  };

  return (
    <div className="alert-map-container">
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {alerts.map((alert) => (
          <React.Fragment key={alert.id}>
            <Circle
              center={[alert.coordinates.lat, alert.coordinates.lng]}
              radius={getLevelRadius(alert.level)}
              pathOptions={{
                color: getLevelColor(alert.level),
                fillColor: getLevelColor(alert.level),
                fillOpacity: 0.3,
              }}
            />
            <Marker position={[alert.coordinates.lat, alert.coordinates.lng]}>
              <Popup>
                <div className="alert-popup">
                  <h3>{alert.region}</h3>
                  <p>
                    <strong>Type:</strong> {alert.type}
                  </p>
                  <p>
                    <strong>Niveau:</strong>{' '}
                    <span
                      className="level-badge"
                      style={{ backgroundColor: getLevelColor(alert.level) }}
                    >
                      {alert.level}
                    </span>
                  </p>
                  <p>
                    <strong>Description:</strong> {alert.description}
                  </p>
                  <p className="alert-timestamp">
                    {new Date(alert.timestamp).toLocaleString('fr-FR')}
                  </p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default AlertMap;
