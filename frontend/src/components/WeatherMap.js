import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getAlertLevelColor } from '../utils/helpers';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Create custom marker icons based on alert level
const createAlertIcon = (level) => {
  const color = getAlertLevelColor(level);
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const WeatherMap = ({ alerts, onMarkerClick, center = [46.603354, 1.888334], zoom = 6 }) => {
  return (
    <div className="weather-map-container">
      <h3>Carte de vigilance météorologique</h3>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {alerts && alerts.map((alert, index) => {
          if (!alert.coordinates) return null;
          
          return (
            <Marker
              key={index}
              position={[alert.coordinates.lat, alert.coordinates.lon]}
              icon={createAlertIcon(alert.level)}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(alert)
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h4>{alert.region}</h4>
                  <p><strong>Niveau:</strong> {alert.level.toUpperCase()}</p>
                  <p><strong>Phénomène:</strong> {alert.phenomenon}</p>
                  <p>{alert.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      <div className="map-legend">
        <h4>Légende</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
            <span>Vert - Pas de vigilance</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FFC107' }}></div>
            <span>Jaune - Soyez attentif</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FF9800' }}></div>
            <span>Orange - Soyez très vigilant</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#F44336' }}></div>
            <span>Rouge - Vigilance absolue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
