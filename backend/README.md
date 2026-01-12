# Weather API Backend

Backend service for the NeuroHub Weather Visualization application.

## Features

- RESTful API for weather data
- Sample weather data for multiple cities
- CORS enabled for frontend integration

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/weather` - Get weather data for all cities
- `GET /api/weather/:city` - Get weather data for a specific city

Available cities: paris, tokyo, new-york, london, sydney

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will run on port 3001 by default.

## Example Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "city": "Paris",
    "country": "France",
    "temperature": 15,
    "condition": "Partly Cloudy",
    "humidity": 65,
    "windSpeed": 12,
    "icon": "⛅"
  }
}
```
