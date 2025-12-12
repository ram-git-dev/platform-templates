const express = require('express');
{% if values.needsDatabase %}
const { Pool } = require('pg');
{% endif %}
{% if values.needsRedis %}
const redis = require('redis');
{% endif %}

const app = express();
const PORT = process.env.PORT || 3000;

{% if values.needsDatabase %}
// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
{% endif %}

{% if values.needsRedis %}
// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect();
{% endif %}

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: '${{ values.name }}' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to ${{ values.name }}',
    description: '${{ values.description }}'
  });
});

{% if values.needsDatabase %}
// Database test endpoint
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ database: 'connected', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ database: 'error', message: err.message });
  }
});
{% endif %}

app.listen(PORT, () => {
  console.log(`${{ values.name }} listening on port ${PORT}`);
});
