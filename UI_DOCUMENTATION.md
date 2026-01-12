# User Interface Documentation

## Application Layout

The Météo France weather website features a modern, intuitive interface designed for easy weather monitoring and alert awareness.

## Page Structure

### 1. Header (Purple Gradient)
- **Brand Logo & Title**: "🌤️ Météo France" with tagline "Vigilance et prévisions météorologiques"
- **Search Bar**: White rounded input field for city search
- **Search Button**: Magnifying glass icon (🔍) for submitting searches
- **Responsive**: Stacks vertically on mobile devices

### 2. Alert Banner (Dynamic Color)
- **Position**: Immediately below header
- **Color Coding**: Background changes based on alert level
  - Green background (#E8F5E9) for Vert alerts
  - Yellow background (#FFF9C4) for Jaune alerts
  - Orange background (#FFE0B2) for Orange alerts
  - Red background (#FFCDD2) for Rouge alerts
- **Content**:
  - Warning icon (⚠️) in colored circle
  - Alert level and phenomenon name
  - Brief description
  - Badge showing number of active alerts
- **Visibility**: Only shown when alerts are active

### 3. Current Weather Card (White Card)
- **Layout**: Centered card with rounded corners and shadow
- **Content**:
  - City name and country code at top
  - Large weather icon from OpenWeatherMap
  - Temperature (large numbers with °C)
  - Weather description (e.g., "nuageux", "ensoleillé")
  - Grid of 4 details:
    - Ressenti (Feels like temperature)
    - Humidité (Humidity percentage)
    - Vent (Wind speed in m/s)
    - Pression (Pressure in hPa)
- **Styling**: Clean, minimalist design with proper spacing

### 4. 5-Day Forecast Card (White Card)
- **Title**: "Prévisions sur 5 jours"
- **Layout**: Grid of forecast items (responsive)
- **Each Forecast Item Contains**:
  - Date or "Aujourd'hui" for current day
  - Weather icon
  - Weather description
  - Max temperature (red color)
  - Min temperature (blue color)
- **Hover Effect**: Cards lift slightly on hover
- **Responsive**: Adapts columns based on screen size

### 5. Interactive Weather Map (White Card)
- **Title**: "Carte de vigilance météorologique"
- **Map Features**:
  - OpenStreetMap base layer
  - Colored circular markers for each alert:
    - Green markers for Vert level
    - Yellow markers for Jaune level
    - Orange markers for Orange level
    - Red markers for Rouge level
  - Markers include white border and shadow
  - Click markers to open popup with alert details
- **Popup Content**:
  - Region name
  - Alert level
  - Phenomenon type
  - Description
- **Legend**: Below map showing all 4 alert levels with colored circles
- **Default View**: Centered on France (latitude: 46.6, longitude: 1.9, zoom: 6)

### 6. Information Section (White Card)
- **Title**: "À propos"
- **Content**: Brief description of the service
- **Purpose**: Explains data sources and update frequency

### 7. Footer (Dark Gray Background)
- **Content**:
  - Copyright notice
  - Data source attribution (OpenWeatherMap)
- **Styling**: Centered white text on dark background

## Color Scheme

### Primary Colors
- **Header Gradient**: Purple (#667eea) to Dark Purple (#764ba2)
- **Background**: Light Blue (#e3f2fd) gradient to Light Gray (#f5f5f5)
- **Cards**: White (#ffffff) with subtle shadow

### Alert Colors
- **Green (Vert)**: #4CAF50 (Safe)
- **Yellow (Jaune)**: #FFC107 (Caution)
- **Orange (Orange)**: #FF9800 (Warning)
- **Red (Rouge)**: #F44336 (Danger)

### Text Colors
- **Primary**: Dark Gray (#333333)
- **Secondary**: Medium Gray (#666666)
- **Tertiary**: Light Gray (#999999)

## Typography

- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', etc.)
- **Header Title**: 32px, Bold (700)
- **Card Titles**: 24px
- **Temperature**: 64px, Light (300)
- **Body Text**: 14-16px
- **Small Text**: 12px

## Responsive Design

### Desktop (> 768px)
- Full width layout up to 1200px container
- Side-by-side grids for forecasts
- Full map visibility

### Mobile (≤ 768px)
- Stacked layout
- Header elements stack vertically
- Forecast items in single or double column
- Reduced padding and font sizes
- Touch-friendly button sizes

## User Interactions

### Search Functionality
1. User types city name in search bar
2. Clicks search button or presses Enter
3. Page updates with new city's weather data
4. Forecast and current weather refresh
5. Error message displays if city not found

### Map Interactions
1. User can pan and zoom the map
2. Clicking marker opens popup with alert details
3. Popup remains until user clicks elsewhere
4. Map centered on France by default
5. Can view all of Europe if zoomed out

### Loading States
- "Chargement des données météo..." while fetching data
- Error messages in red banner if requests fail

## Accessibility Features

- Semantic HTML structure
- Color contrast meets WCAG guidelines
- Keyboard navigation support
- Alt text for weather icons
- Readable font sizes
- Touch-friendly click targets (minimum 44px)

## Data Flow

1. **Initial Load**:
   - Fetches alerts from backend
   - Fetches current weather for Paris (default)
   - Fetches 5-day forecast for Paris
   - Displays all data on page

2. **City Search**:
   - User searches for new city
   - Fetches current weather for that city
   - Fetches 5-day forecast
   - Updates display with new data
   - Alerts remain the same (regional, not city-specific)

3. **Real-time Updates**:
   - Weather data refreshes on each search
   - Alert data loaded once on page load
   - Can be extended to auto-refresh at intervals

## Component Hierarchy

```
App
└── Home
    ├── Header
    ├── AlertBanner
    ├── WeatherCard
    ├── ForecastCard
    ├── WeatherMap
    ├── InfoSection
    └── Footer
```

## API Integration

- **Current Weather**: OpenWeatherMap API via backend proxy
- **Forecasts**: OpenWeatherMap 5-day forecast API
- **Alerts**: Custom backend API with simulated data
- **Map Tiles**: OpenStreetMap tiles (free, no API key needed)

## Performance Considerations

- Images lazy-loaded where possible
- Map renders only once and updates markers dynamically
- Forecast data grouped by day for efficiency
- API calls batched when possible (Promise.all)
- Built app includes code splitting and minification

## Future UI Enhancements

Potential improvements:
- Dark mode toggle
- Language selector (French/English)
- Weather radar overlay on map
- Historical weather graphs
- Mobile app version
- Push notifications for alerts
- Customizable dashboard
- Save favorite cities
- Share weather conditions
- Weather widgets for embedding

---

This documentation describes the user interface as implemented in the current version. For technical implementation details, see the component files in `frontend/src/components/` and `frontend/src/pages/`.
