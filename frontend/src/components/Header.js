import React from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchCity, setSearchCity] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim() && onSearch) {
      onSearch(searchCity.trim());
      setSearchCity('');
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <h1>🌤️ Météo France</h1>
          <p className="header-tagline">Vigilance et prévisions météorologiques</p>
        </div>
        
        <form className="header-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Rechercher une ville..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
