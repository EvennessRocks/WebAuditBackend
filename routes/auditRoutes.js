const express = require('express');
const auditController = require('../controllers/auditController');
const validateUrl = require('../middlewares/urlValidationMiddleware');  // Import the middleware
const router = express.Router();

// Define the audit route with URL validation middleware
router.post('/', validateUrl, auditController.auditWebsite);

module.exports = router;