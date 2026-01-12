import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import VigilancePage from './pages/VigilancePage';
import MapPage from './pages/MapPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city/:cityId" element={<CityPage />} />
            <Route path="/vigilance" element={<VigilancePage />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
