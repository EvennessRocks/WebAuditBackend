const express = require('express');
const cors = require('cors');
const auditRoutes = require('./routes/auditRoutes');

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use(express.json());

// Set up routes
app.use('/api/audit', auditRoutes);

//re-deploy

module.exports = app;