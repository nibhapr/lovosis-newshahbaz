const express = require('express');
const { connectDB } = require('./src/lib/db');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Connect to the database
connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});
