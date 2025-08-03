const express = require('express');
const app = express();
const db = require('./models/db');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Welcome to LegalEasy using Node.js + Express!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});