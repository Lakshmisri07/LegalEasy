const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const pool = require('./config/db');

const docsRoutes = require('./routes/docs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: rows[0].ok === 1 });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

app.use('/api/docs', docsRoutes);

// Serve frontend (optional production build hosting)
const path = require('path');
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`LegalEasy API running on http://localhost:${PORT}`);
});
