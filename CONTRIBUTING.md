# Contributing to Météo France

Thank you for your interest in contributing to this project! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/neurohub.git
   cd neurohub
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/Rose-5ht2a/neurohub.git
   ```

## Development Setup

### Prerequisites
- Node.js v14+ and npm
- MongoDB (optional for local development)
- OpenWeatherMap API key

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Project Structure

```
neurohub/
├── backend/              # Express.js API server
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Main server file
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── utils/       # Utility functions
│   └── public/          # Static files
├── README.md
├── API.md              # API documentation
└── DEPLOYMENT.md       # Deployment guide
```

## Coding Standards

### JavaScript/React

- Use ES6+ features
- Follow functional programming patterns when possible
- Use meaningful variable and function names
- Keep components small and focused
- Use PropTypes for component props (optional)

### Code Style

- Indentation: 2 spaces
- Semicolons: Yes
- Quotes: Single quotes for strings
- Line length: Max 100 characters (flexible)

### Comments

- Write clear, concise comments
- Explain "why" not "what" when code isn't self-explanatory
- Document complex algorithms
- Keep comments up-to-date with code changes

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-weather-radar` - New features
- `fix/map-marker-bug` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/simplify-api` - Code refactoring

### Commit Messages

Follow conventional commit format:
```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(map): add weather radar overlay
fix(alerts): correct alert level color mapping
docs(api): update endpoint documentation
```

### Making a Pull Request

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

3. Keep your branch updated:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request on GitHub

### Pull Request Guidelines

- Fill out the PR template completely
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Keep PRs focused on a single change

## Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

### Manual Testing

1. Start both backend and frontend
2. Test new features thoroughly
3. Check browser console for errors
4. Test on different screen sizes
5. Verify API responses

## Feature Requests

### Adding New Components

When adding React components:
1. Create component file in `frontend/src/components/`
2. Create corresponding CSS file
3. Export component
4. Add to appropriate page
5. Document props and usage

Example structure:
```javascript
import React from 'react';
import './MyComponent.css';

const MyComponent = ({ prop1, prop2 }) => {
  // Component logic
  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

### Adding New API Endpoints

When adding backend routes:
1. Create or modify route file in `backend/routes/`
2. Implement endpoint logic
3. Add error handling
4. Document in API.md
5. Test with curl or Postman

Example:
```javascript
// backend/routes/example.js
const express = require('express');
const router = express.Router();

router.get('/endpoint', async (req, res) => {
  try {
    // Logic here
    res.json({ data: 'response' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Common Tasks

### Adding a New Alert Level

1. Update `ALERT_LEVELS` in `frontend/src/utils/helpers.js`
2. Update backend validation in `backend/routes/alerts.js`
3. Update documentation in API.md
4. Add to map legend in `WeatherMap.js`

### Adding a New Weather Parameter

1. Update weather route in `backend/routes/weather.js`
2. Update `WeatherCard` component to display new parameter
3. Update API documentation

### Adding a New French Region

1. Add region to alerts data in `backend/routes/alerts.js`
2. Add coordinates for map marker
3. Consider creating a regions configuration file

## Questions?

If you have questions:
- Check existing issues
- Read the documentation (README.md, API.md, DEPLOYMENT.md)
- Open a new issue with the "question" label

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Thank You!

Thank you for contributing to make this project better! 🎉
