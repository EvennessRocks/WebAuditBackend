const auditService = require('../services/auditService');

exports.auditWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    const summary = await auditService.auditAndSummarize(url);
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error auditing website:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};