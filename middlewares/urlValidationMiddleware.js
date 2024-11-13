const axios = require('axios');

// Function to validate URL format
function isValidUrl(url) {
  try {
    new URL(url);  // Will throw an error if the URL is invalid
    return true;
  } catch (e) {
    return false;
  }
}

// Function to check if the URL is reachable
async function isReachable(url) {
  try {
    const response = await axios.get(url, { timeout: 5000 });  // Timeout after 5 seconds
    return response.status === 200;
  } catch (error) {
    return false;  // If the request fails (e.g., 404, timeout), return false
  }
}

// URL validation middleware
const validateUrl = async (req, res, next) => {
  const { url } = req.body;

  // Validate URL format
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL. Please provide a valid URL.' });
  }

  // Check if the URL is reachable
  const reachable = await isReachable(url);
  if (!reachable) {
    return res.status(400).json({ error: 'The provided URL is not reachable. Please ensure the website is online.' });
  }

  // If validation passes, proceed to the next middleware/controller
  next();
};

module.exports = validateUrl;