const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use(router);

app.use((error, _req, res, _next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;