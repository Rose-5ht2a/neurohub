import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">NeuroHub</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/login" className="hover:underline">Connexion</Link>
          <Link to="/signup" className="hover:underline">Inscription</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
