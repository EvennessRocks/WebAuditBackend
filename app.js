const express = require('express');
const auditRoutes = require('./routes/auditRoutes');

const app = express();
app.use(express.json());

// Set up routes
app.use('/api/audit', auditRoutes);

module.exports = app;