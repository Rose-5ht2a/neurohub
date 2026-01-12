import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AlertBanner from '../components/AlertBanner';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import WeatherMap from '../components/WeatherMap';
import { getCurrentWeather, getForecast, getAllAlerts } from '../services/api';
import './Home.css';

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Paris');

  useEffect(() => {
    loadWeatherData(selectedCity);
    loadAlerts();
  }, [selectedCity]);

  const loadWeatherData = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error loading weather data:', err);
      setError('Impossible de charger les données météo. Vérifiez le nom de la ville.');
    } finally {
      setLoading(false);
    }
  };

  const loadAlerts = async () => {
    try {
      const alertsData = await getAllAlerts();
      setAlerts(alertsData);
    } catch (err) {
      console.error('Error loading alerts:', err);
    }
  };

  const handleSearch = (city) => {
    setSelectedCity(city);
  };

  const handleMarkerClick = (alert) => {
    console.log('Alert clicked:', alert);
    // Could open a modal or navigate to region details
  };

  return (
    <div className="home-page">
      <Header onSearch={handleSearch} />
      
      <main className="main-content">
        <div className="container">
          {alerts.length > 0 && <AlertBanner alerts={alerts} />}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="loading-message">
              Chargement des données météo...
            </div>
          ) : (
            <>
              <WeatherCard weather={currentWeather} />
              {forecast && <ForecastCard forecasts={forecast.forecasts} />}
            </>
          )}
          
          <WeatherMap 
            alerts={alerts} 
            onMarkerClick={handleMarkerClick}
          />
          
          <div className="info-section">
            <h3>À propos</h3>
            <p>
              Ce site fournit des informations météorologiques en temps réel 
              et des alertes de vigilance pour toutes les régions de France. 
              Les données sont mises à jour régulièrement pour vous offrir 
              les prévisions les plus précises.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>© 2024 Météo France - Tous droits réservés</p>
          <p className="footer-note">
            Données météorologiques fournies par OpenWeatherMap
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
