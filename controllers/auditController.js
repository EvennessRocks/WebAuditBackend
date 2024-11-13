const auditService = require('../services/auditService');

exports.auditWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    const summary = await auditService.auditAndSummarize(url);  // Call service to run the audit and summarize
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error auditing website:', error);
    res.status(500).json({ error: 'Internal Server Error' });  // Respond with a 500 if there is a service failure
  }
};