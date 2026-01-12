# Weather Visualization Frontend

React.js frontend for the NeuroHub Weather Visualization application.

## Features

- Modern, responsive weather dashboard
- Real-time weather data display
- Beautiful gradient cards for each location
- Refresh functionality
- Error handling and loading states

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will run on http://localhost:3000

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:3001
```

## Building for Production

```bash
npm run build
```

## Components

- **App.js** - Main application component with data fetching
- **WeatherCard** - Weather display component for individual cities

## Technology Stack

- React.js
- CSS3 with gradients and animations
- Fetch API for backend communication
