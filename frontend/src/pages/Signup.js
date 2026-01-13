import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Inscription avec: ${name}, ${email}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Inscription</h2>
        <input
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Signup;
