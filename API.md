# API Documentation - Météo France

Base URL: `http://localhost:5000/api` (development) or `https://your-domain.com/api` (production)

## Authentication

Currently, the API does not require authentication. In a production environment, consider implementing API keys or JWT tokens for protected endpoints.

## Weather Endpoints

### Get Current Weather by City

Retrieves current weather conditions for a specified city.

**Endpoint:** `GET /weather/current/:city`

**Parameters:**
- `city` (path parameter) - City name (e.g., "Paris", "Lyon", "Marseille")

**Example Request:**
```bash
curl http://localhost:5000/api/weather/current/Paris
```

**Example Response:**
```json
{
  "city": "Paris",
  "country": "FR",
  "temperature": 12.5,
  "feelsLike": 10.2,
  "humidity": 75,
  "pressure": 1013,
  "description": "nuageux",
  "icon": "04d",
  "windSpeed": 5.2,
  "coordinates": {
    "lat": 48.8566,
    "lon": 2.3522
  }
}
```

**Error Response:**
```json
{
  "error": "Failed to fetch weather data",
  "message": "city not found"
}
```

---

### Get Weather Forecast by City

Retrieves 5-day weather forecast for a specified city.

**Endpoint:** `GET /weather/forecast/:city`

**Parameters:**
- `city` (path parameter) - City name

**Example Request:**
```bash
curl http://localhost:5000/api/weather/forecast/Lyon
```

**Example Response:**
```json
{
  "city": "Lyon",
  "country": "FR",
  "forecasts": {
    "2026-01-13": [
      {
        "time": "2026-01-13 12:00:00",
        "temperature": 14.5,
        "description": "ciel dégagé",
        "icon": "01d",
        "humidity": 65,
        "windSpeed": 3.5
      },
      ...
    ],
    "2026-01-14": [...],
    ...
  }
}
```

---

### Get Weather by Coordinates

Retrieves current weather for specified GPS coordinates.

**Endpoint:** `GET /weather/coordinates`

**Query Parameters:**
- `lat` (required) - Latitude
- `lon` (required) - Longitude

**Example Request:**
```bash
curl "http://localhost:5000/api/weather/coordinates?lat=48.8566&lon=2.3522"
```

**Example Response:**
```json
{
  "city": "Paris",
  "country": "FR",
  "temperature": 12.5,
  "feelsLike": 10.2,
  "humidity": 75,
  "pressure": 1013,
  "description": "nuageux",
  "icon": "04d",
  "windSpeed": 5.2,
  "coordinates": {
    "lat": 48.8566,
    "lon": 2.3522
  }
}
```

---

## Alert Endpoints

### Get All Active Alerts

Retrieves all active weather alerts.

**Endpoint:** `GET /alerts`

**Example Request:**
```bash
curl http://localhost:5000/api/alerts
```

**Example Response:**
```json
[
  {
    "id": 1,
    "region": "Île-de-France",
    "level": "yellow",
    "phenomenon": "Pluie-inondation",
    "description": "Risque de fortes pluies et d'inondations locales",
    "startDate": "2026-01-12T22:00:00.000Z",
    "endDate": "2026-01-13T22:00:00.000Z",
    "coordinates": {
      "lat": 48.8566,
      "lon": 2.3522
    },
    "active": true
  },
  ...
]
```

---

### Get Alert by Region

Retrieves active alert for a specific region.

**Endpoint:** `GET /alerts/region/:region`

**Parameters:**
- `region` (path parameter) - Region name (e.g., "Île-de-France", "Bretagne")

**Example Request:**
```bash
curl http://localhost:5000/api/alerts/region/Bretagne
```

**Example Response:**
```json
{
  "id": 3,
  "region": "Bretagne",
  "level": "green",
  "phenomenon": "Aucun",
  "description": "Pas d'alerte en cours",
  "startDate": "2026-01-12T22:00:00.000Z",
  "endDate": "2026-01-13T22:00:00.000Z",
  "coordinates": {
    "lat": 48.1173,
    "lon": -1.6778
  },
  "active": true
}
```

**Error Response:**
```json
{
  "error": "No alert found for this region"
}
```

---

### Get Alerts by Level

Retrieves all active alerts of a specific level.

**Endpoint:** `GET /alerts/level/:level`

**Parameters:**
- `level` (path parameter) - Alert level: `green`, `yellow`, `orange`, or `red`

**Example Request:**
```bash
curl http://localhost:5000/api/alerts/level/orange
```

**Example Response:**
```json
[
  {
    "id": 2,
    "region": "Provence-Alpes-Côte d'Azur",
    "level": "orange",
    "phenomenon": "Canicule",
    "description": "Températures élevées attendues",
    "startDate": "2026-01-12T22:00:00.000Z",
    "endDate": "2026-01-14T22:00:00.000Z",
    "coordinates": {
      "lat": 43.2965,
      "lon": 5.3698
    },
    "active": true
  }
]
```

---

### Create New Alert

Creates a new weather alert.

**Endpoint:** `POST /alerts`

**Request Body:**
```json
{
  "region": "Normandie",
  "level": "yellow",
  "phenomenon": "Vent violent",
  "description": "Vents forts attendus dans la soirée",
  "startDate": "2026-01-13T18:00:00.000Z",
  "endDate": "2026-01-14T06:00:00.000Z",
  "coordinates": {
    "lat": 49.4432,
    "lon": 1.0993
  }
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "region": "Normandie",
    "level": "yellow",
    "phenomenon": "Vent violent",
    "description": "Vents forts attendus dans la soirée",
    "startDate": "2026-01-13T18:00:00.000Z",
    "endDate": "2026-01-14T06:00:00.000Z",
    "coordinates": {
      "lat": 49.4432,
      "lon": 1.0993
    }
  }'
```

**Example Response:**
```json
{
  "id": 4,
  "region": "Normandie",
  "level": "yellow",
  "phenomenon": "Vent violent",
  "description": "Vents forts attendus dans la soirée",
  "startDate": "2026-01-13T18:00:00.000Z",
  "endDate": "2026-01-14T06:00:00.000Z",
  "coordinates": {
    "lat": 49.4432,
    "lon": 1.0993
  },
  "active": true
}
```

**Error Response:**
```json
{
  "error": "Missing required fields"
}
```

---

### Update Alert

Updates an existing weather alert.

**Endpoint:** `PUT /alerts/:id`

**Parameters:**
- `id` (path parameter) - Alert ID

**Request Body:** (all fields optional)
```json
{
  "level": "red",
  "description": "Situation aggravée - vigilance maximale"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:5000/api/alerts/2 \
  -H "Content-Type: application/json" \
  -d '{
    "level": "red",
    "description": "Situation aggravée - vigilance maximale"
  }'
```

**Example Response:**
```json
{
  "id": 2,
  "region": "Provence-Alpes-Côte d'Azur",
  "level": "red",
  "phenomenon": "Canicule",
  "description": "Situation aggravée - vigilance maximale",
  "startDate": "2026-01-12T22:00:00.000Z",
  "endDate": "2026-01-14T22:00:00.000Z",
  "coordinates": {
    "lat": 43.2965,
    "lon": 5.3698
  },
  "active": true
}
```

**Error Response:**
```json
{
  "error": "Alert not found"
}
```

---

### Delete Alert

Deactivates an alert (soft delete).

**Endpoint:** `DELETE /alerts/:id`

**Parameters:**
- `id` (path parameter) - Alert ID

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/api/alerts/1
```

**Example Response:**
```json
{
  "message": "Alert deleted successfully"
}
```

**Error Response:**
```json
{
  "error": "Alert not found"
}
```

---

## Health Check

### Server Health Check

Checks if the API server is running.

**Endpoint:** `GET /health`

**Example Request:**
```bash
curl http://localhost:5000/api/health
```

**Example Response:**
```json
{
  "status": "ok",
  "message": "Weather API is running"
}
```

---

## Alert Levels

The system uses four alert levels based on the French weather vigilance system:

| Level | Color | Code | Description |
|-------|-------|------|-------------|
| Vert | Green | `green` | Pas de vigilance particulière |
| Jaune | Yellow | `yellow` | Soyez attentif |
| Orange | Orange | `orange` | Soyez très vigilant |
| Rouge | Red | `red` | Vigilance absolue |

---

## Common Phenomenon Types

Typical weather phenomena for alerts include:

- `Pluie-inondation` - Rain and flooding
- `Orages` - Thunderstorms
- `Vent violent` - Strong winds
- `Canicule` - Heat wave
- `Grand froid` - Extreme cold
- `Neige-verglas` - Snow and ice
- `Avalanches` - Avalanche risk
- `Vagues-submersion` - Waves and coastal flooding

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created (for POST requests) |
| 400 | Bad Request - Missing or invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Rate Limiting

Consider implementing rate limiting in production:
- Recommended: 100 requests per 15 minutes per IP
- Use packages like `express-rate-limit`

---

## CORS

The API uses CORS to allow cross-origin requests. In production, configure CORS to only allow your frontend domain.

---

## Data Sources

- Weather data: [OpenWeatherMap API](https://openweathermap.org/api)
- Alert data: Stored locally (in-memory or MongoDB)

---

## Future Enhancements

Potential API improvements:
- Authentication with JWT tokens
- Webhooks for alert notifications
- Historical weather data
- Weather radar images
- Air quality data
- UV index information
- Pollen alerts
