const express = require('express');
const auditController = require('../controllers/auditController');
const router = express.Router();

// Define the audit route
router.post('/', auditController.auditWebsite);

module.exports = router;