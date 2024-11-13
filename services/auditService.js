const axeAudit = require('../utils/axeAudit');
const openAIClient = require('../utils/openAIClient');

exports.auditAndSummarize = async (url) => {
  const results = await axeAudit.runAxeAudit(url);
  const summary = await openAIClient.summarizeResults(results);
  return summary;
};