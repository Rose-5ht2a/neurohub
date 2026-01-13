const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Authentication routes can be added here

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});