import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🌤️ NeuroHub Météo</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/map" className="nav-link">Carte</Link>
          <Link to="/vigilance" className="nav-link">Vigilance</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
