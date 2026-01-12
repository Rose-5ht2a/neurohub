import React, { useState } from 'react';
import '../styles/AlertForm.css';

function AlertForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    region: '',
    department: '',
    level: 'jaune',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    recommendations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const alertData = {
      ...formData,
      recommendations: formData.recommendations
        .split('\n')
        .filter(rec => rec.trim() !== '')
    };

    onSubmit(alertData);
  };

  return (
    <div className="alert-form-container">
      <h3>Créer une nouvelle alerte météo</h3>
      <form onSubmit={handleSubmit} className="alert-form">
        <div className="form-row">
          <div className="form-group">
            <label>Région *</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              placeholder="Ex: Provence-Alpes-Côte d'Azur"
            />
          </div>
          <div className="form-group">
            <label>Département *</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="Ex: Bouches-du-Rhône"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Niveau de vigilance *</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="jaune">Jaune</option>
              <option value="orange">Orange</option>
              <option value="rouge">Rouge</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type d'alerte *</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              placeholder="Ex: Vent violent, Pluie-inondation, Orages"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Description détaillée de l'alerte météo"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date de début *</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date de fin *</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Recommandations (une par ligne)</label>
          <textarea
            name="recommendations"
            value={formData.recommendations}
            onChange={handleChange}
            rows="4"
            placeholder="Entrez chaque recommandation sur une nouvelle ligne"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="submit-button">
            Créer l'alerte
          </button>
        </div>
      </form>
    </div>
  );
}

export default AlertForm;
