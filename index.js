// index.js
const express = require('express');
const cors = require('cors'); // ✅ You missed importing this
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('✅ Webhook received!');
  console.log('📩 Headers:', req.headers);
  console.log('📦 Body:', JSON.stringify(req.body, null, 2));
  res.status(200).send('✅ Webhook received!');
});

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Webhook Server is up and running');
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook server running at http://localhost:${PORT}`);
});
