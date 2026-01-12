// Alert level configurations
export const ALERT_LEVELS = {
  green: {
    name: 'Vert',
    color: '#4CAF50',
    bgColor: '#E8F5E9',
    description: 'Pas de vigilance particulière'
  },
  yellow: {
    name: 'Jaune',
    color: '#FFC107',
    bgColor: '#FFF9C4',
    description: 'Soyez attentif'
  },
  orange: {
    name: 'Orange',
    color: '#FF9800',
    bgColor: '#FFE0B2',
    description: 'Soyez très vigilant'
  },
  red: {
    name: 'Rouge',
    color: '#F44336',
    bgColor: '#FFCDD2',
    description: 'Vigilance absolue'
  }
};

export const getAlertLevelConfig = (level) => {
  return ALERT_LEVELS[level?.toLowerCase()] || ALERT_LEVELS.green;
};

export const getAlertLevelName = (level) => {
  return getAlertLevelConfig(level).name;
};

export const getAlertLevelColor = (level) => {
  return getAlertLevelConfig(level).color;
};

export const getAlertLevelBgColor = (level) => {
  return getAlertLevelConfig(level).bgColor;
};

// Weather icon mapping
export const getWeatherIconUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
