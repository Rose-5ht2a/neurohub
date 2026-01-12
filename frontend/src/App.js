import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/weather`);
      const result = await response.json();
      
      if (result.success) {
        setWeatherData(result.data);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError('Error connecting to weather API: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 Virtual World Weather Dashboard</h1>
        <p className="subtitle">Real-time weather conditions from around the globe</p>
      </header>
      
      <main className="weather-container">
        {loading && <div className="loading">Loading weather data...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <div className="weather-grid">
            {weatherData.map((weather) => (
              <WeatherCard key={weather.id} weather={weather} />
            ))}
          </div>
        )}
        
        {!loading && !error && weatherData.length === 0 && (
          <div className="no-data">No weather data available</div>
        )}
      </main>
      
      <footer className="App-footer">
        <button onClick={fetchWeatherData} className="refresh-button">
          🔄 Refresh Data
        </button>
      </footer>
    </div>
  );
}

export default App;
