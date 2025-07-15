const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  console.log('✅ Webhook received!');
  console.log('📩 Headers:', req.headers);
  console.log('📦 Body:', JSON.stringify(req.body, null, 2));

  try {
    const discordWebhookURL = 'https://discord.com/api/webhooks/1393671411041702000/ts26-MxeDyqQ5FqfSF9zqVOc2rb__LGdNhxg3h0twuS64zCK3LMBR04zpwU1hf-l2Acx';
    const tradingBotURL = 'http://localhost:3000/trade'; // or your server's IP and port

    // Forward request to trading bot
    const tradingBot_Response = await axios.post(tradingBotURL, req.body);
    console.log('✅ Order Placed:', tradingBot_Response.data);

    // Forward request to Discord webhook
    const discordResponse = await axios.post(discordWebhookURL, req.body);
    console.log('✅ Sent to Discord!');

    res.status(200).send('Forwarded to all services!');
  } catch (error) {
    console.error('❌ Error sending to services:', error.response?.data || error.message);
    res.status(500).send('Error forwarding to Discord');
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Webhook Server is up and running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Webhook server running at http://0.0.0.0:${PORT}`);
});
