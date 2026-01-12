# API Documentation - NeuroHub Weather Alerts

Base URL: `http://localhost:5000`

## Endpoints

### Health Check

#### GET /health
Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-12T20:00:00.000Z"
}
```

---

### Alerts

#### GET /alerts
Retrieve all active weather alerts.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "region": "Nord",
      "level": "orange",
      "type": "Vents violents",
      "description": "Vents violents attendus avec des rafales jusqu'à 100 km/h",
      "coordinates": {
        "lat": 50.6292,
        "lng": 3.0573
      },
      "timestamp": "2026-01-12T20:29:52.679Z"
    }
  ],
  "count": 1
}
```

---

#### GET /alerts/:id
Retrieve a specific alert by ID.

**Parameters:**
- `id` (path parameter): Alert ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "region": "Nord",
    "level": "orange",
    "type": "Vents violents",
    "description": "Vents violents attendus avec des rafales jusqu'à 100 km/h",
    "coordinates": {
      "lat": 50.6292,
      "lng": 3.0573
    },
    "timestamp": "2026-01-12T20:29:52.679Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Alert not found"
}
```

---

#### POST /alerts
Create a new alert or update an existing one for a region.

**Request Body:**
```json
{
  "region": "Centre",
  "level": "rouge",
  "type": "Inondations",
  "description": "Fortes pluies causant des inondations importantes",
  "coordinates": {
    "lat": 47.0,
    "lng": 2.0
  }
}
```

**Required Fields:**
- `region` (string): Name of the region
- `level` (string): One of: `vert`, `jaune`, `orange`, `rouge`
- `type` (string): Type of weather phenomenon
- `description` (string): Detailed description of the alert

**Optional Fields:**
- `coordinates` (object): Geographic coordinates with `lat` and `lng`

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "Alert created",
  "data": {
    "id": 3,
    "region": "Centre",
    "level": "rouge",
    "type": "Inondations",
    "description": "Fortes pluies causant des inondations importantes",
    "coordinates": {
      "lat": 47.0,
      "lng": 2.0
    },
    "timestamp": "2026-01-12T20:30:14.622Z"
  }
}
```

**Response (200 - Updated):**
```json
{
  "success": true,
  "message": "Alert updated",
  "data": {
    "id": 1,
    "region": "Centre",
    "level": "rouge",
    "type": "Inondations",
    "description": "Fortes pluies causant des inondations importantes",
    "coordinates": {
      "lat": 47.0,
      "lng": 2.0
    },
    "timestamp": "2026-01-12T20:30:14.622Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Missing required fields: region, level, type, description"
}
```

or

```json
{
  "success": false,
  "message": "Invalid level. Must be one of: vert, jaune, orange, rouge"
}
```

---

#### PUT /alerts/:id
Update an existing alert.

**Parameters:**
- `id` (path parameter): Alert ID

**Request Body (all fields optional):**
```json
{
  "region": "Nord-Est",
  "level": "rouge",
  "type": "Tempête",
  "description": "Tempête violente avec rafales à 120 km/h",
  "coordinates": {
    "lat": 49.5,
    "lng": 5.5
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Alert updated",
  "data": {
    "id": 1,
    "region": "Nord-Est",
    "level": "rouge",
    "type": "Tempête",
    "description": "Tempête violente avec rafales à 120 km/h",
    "coordinates": {
      "lat": 49.5,
      "lng": 5.5
    },
    "timestamp": "2026-01-12T20:35:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Alert not found"
}
```

---

#### DELETE /alerts/:id
Delete an alert.

**Parameters:**
- `id` (path parameter): Alert ID

**Response:**
```json
{
  "success": true,
  "message": "Alert deleted",
  "data": {
    "id": 1,
    "region": "Nord",
    "level": "orange",
    "type": "Vents violents",
    "description": "Vents violents attendus avec des rafales jusqu'à 100 km/h",
    "coordinates": {
      "lat": 50.6292,
      "lng": 3.0573
    },
    "timestamp": "2026-01-12T20:29:52.679Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Alert not found"
}
```

---

## Alert Levels

| Level | Color | Description |
|-------|-------|-------------|
| `vert` | Green | No particular vigilance required |
| `jaune` | Yellow | Be attentive - Usual phenomena |
| `orange` | Orange | Be very vigilant - Dangerous phenomena |
| `rouge` | Red | Absolute vigilance - Very dangerous phenomena |

---

## Example Usage with cURL

### Get all alerts
```bash
curl http://localhost:5000/alerts
```

### Create a new alert
```bash
curl -X POST http://localhost:5000/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "region": "Ouest",
    "level": "orange",
    "type": "Tempête",
    "description": "Fortes précipitations et vents violents",
    "coordinates": {"lat": 48.0, "lng": -4.0}
  }'
```

### Update an alert
```bash
curl -X PUT http://localhost:5000/alerts/1 \
  -H "Content-Type: application/json" \
  -d '{"level": "rouge"}'
```

### Delete an alert
```bash
curl -X DELETE http://localhost:5000/alerts/1
```

---

## CORS

The API has CORS enabled, allowing requests from any origin. For production use, consider restricting this to specific domains.

---

## Data Storage

Currently, alerts are stored in memory. When the server restarts, all alerts are reset to the initial sample data. For production use, consider implementing a database backend (MongoDB, PostgreSQL, etc.).
