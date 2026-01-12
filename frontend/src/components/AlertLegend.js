import React from 'react';
import './AlertLegend.css';

const AlertLegend = () => {
  const levels = [
    {
      color: '#28a745',
      name: 'Vert',
      description: 'Pas de vigilance particulière',
    },
    {
      color: '#ffc107',
      name: 'Jaune',
      description: 'Soyez attentif - Phénomènes habituels',
    },
    {
      color: '#fd7e14',
      name: 'Orange',
      description: 'Soyez très vigilant - Phénomènes dangereux',
    },
    {
      color: '#dc3545',
      name: 'Rouge',
      description: 'Vigilance absolue - Phénomènes très dangereux',
    },
  ];

  return (
    <div className="alert-legend">
      <h3>Niveaux de Vigilance</h3>
      <div className="legend-items">
        {levels.map((level, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: level.color }}
            ></div>
            <div className="legend-content">
              <strong>{level.name}</strong>
              <p>{level.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertLegend;
