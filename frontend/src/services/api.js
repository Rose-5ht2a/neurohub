import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Weather API
export const weatherAPI = {
  getAllCities: () => api.get('/weather'),
  getCityWeather: (cityId) => api.get(`/weather/${cityId}`),
};

// Vigilance API
export const vigilanceAPI = {
  getAllAlerts: () => api.get('/vigilance/alerts'),
  getRegionAlerts: (region) => api.get(`/vigilance/alerts/${region}`),
  getAllRegions: () => api.get('/vigilance/regions'),
  getRegion: (regionId) => api.get(`/vigilance/regions/${regionId}`),
  createAlert: (alertData) => api.post('/vigilance/alerts', alertData),
  updateAlert: (id, alertData) => api.put(`/vigilance/alerts/${id}`, alertData),
  deleteAlert: (id) => api.delete(`/vigilance/alerts/${id}`),
  updateRegionVigilance: (regionId, level) => 
    api.put(`/vigilance/regions/${regionId}`, { vigilanceLevel: level }),
};

export default api;
