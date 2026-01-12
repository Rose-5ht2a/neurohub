import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Weather API calls
export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather/current/${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getForecast = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather/forecast/${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather/coordinates`, {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

// Alerts API calls
export const getAllAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const getAlertByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts/region/${region}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alert by region:', error);
    throw error;
  }
};

export const getAlertsByLevel = async (level) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts/level/${level}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts by level:', error);
    throw error;
  }
};

export const createAlert = async (alertData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/alerts`, alertData);
    return response.data;
  } catch (error) {
    console.error('Error creating alert:', error);
    throw error;
  }
};

export const updateAlert = async (id, alertData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/alerts/${id}`, alertData);
    return response.data;
  } catch (error) {
    console.error('Error updating alert:', error);
    throw error;
  }
};

export const deleteAlert = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/alerts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting alert:', error);
    throw error;
  }
};
