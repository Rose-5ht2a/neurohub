import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { weatherAPI, vigilanceAPI } from '../services/api';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapPage() {
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherResponse, regionsResponse] = await Promise.all([
          weatherAPI.getAllCities(),
          vigilanceAPI.getAllRegions()
        ]);
        setCities(weatherResponse.data.cities);
        setRegions(regionsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getVigilanceColor = (level) => {
    const colors = {
      'vert': '#4caf50',
      'jaune': '#ffeb3b',
      'orange': '#ff9800',
      'rouge': '#f44336'
    };
    return colors[level] || colors.vert;
  };

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

  if (loading) {
    return <div className="loading">Chargement de la carte...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Center of France
  const centerPosition = [46.603354, 1.888334];

  return (
    <div className="map-page">
      <div className="map-header">
        <h1>Carte Interactive Météo</h1>
        <div className="map-legend">
          <h3>Légende des niveaux de vigilance</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#4caf50' }}></span>
              <span>Vert - Pas de vigilance</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#ffeb3b' }}></span>
              <span>Jaune - Soyez attentifs</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#ff9800' }}></span>
              <span>Orange - Soyez très vigilants</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#f44336' }}></span>
              <span>Rouge - Vigilance absolue</span>
            </div>
          </div>
        </div>
      </div>

      <div className="map-container-wrapper">
        <MapContainer
          center={centerPosition}
          zoom={6}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Display cities with markers */}
          {cities.map(city => (
            <Marker
              key={city.id}
              position={[city.coordinates.lat, city.coordinates.lon]}
            >
              <Popup>
                <div className="map-popup">
                  <h3>{city.name}</h3>
                  <p className="popup-region">{city.region}</p>
                  <div className="popup-weather">
                    <span className="popup-icon">{getWeatherIcon(city.current.icon)}</span>
                    <span className="popup-temp">{city.current.temperature}°C</span>
                  </div>
                  <p className="popup-condition">{city.current.condition}</p>
                  <div className="popup-details">
                    <p>💧 Humidité: {city.current.humidity}%</p>
                    <p>💨 Vent: {city.current.windSpeed} km/h</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Display regions with circles for vigilance */}
          {regions.map(region => (
            <Circle
              key={region.id}
              center={[region.coordinates.lat, region.coordinates.lon]}
              radius={50000}
              pathOptions={{
                color: getVigilanceColor(region.vigilanceLevel),
                fillColor: getVigilanceColor(region.vigilanceLevel),
                fillOpacity: 0.2,
                weight: 2
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h3>{region.name}</h3>
                  <p>Niveau de vigilance: <strong>{region.vigilanceLevel.toUpperCase()}</strong></p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      <div className="map-info">
        <div className="info-section">
          <h3>🌡️ Températures actuelles</h3>
          <ul>
            {cities.map(city => (
              <li key={city.id}>
                <strong>{city.name}:</strong> {city.current.temperature}°C - {city.current.condition}
              </li>
            ))}
          </ul>
        </div>
        <div className="info-section">
          <h3>⚠️ État de vigilance</h3>
          <ul>
            {regions
              .filter(r => r.vigilanceLevel !== 'vert')
              .map(region => (
                <li key={region.id}>
                  <strong>{region.name}:</strong> <span style={{ color: getVigilanceColor(region.vigilanceLevel) }}>
                    {region.vigilanceLevel.toUpperCase()}
                  </span>
                </li>
              ))}
            {regions.every(r => r.vigilanceLevel === 'vert') && (
              <li>Toutes les régions sont au niveau vert</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
