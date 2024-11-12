// Import necessary modules
const puppeteer = require('puppeteer');
const axeCore = require('axe-core');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config(); // Load environment variables from .env
const OpenAI = require('openai');

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: '', // Using the environment variable for security
});

// Function to run axe-core audit on a given URL
async function runAxeAudit(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(url);

  // Inject axe-core and run it
  await page.evaluate(axeSource => eval(axeSource), axeCore.source);
  const results = await page.evaluate(() => axe.run());

  await browser.close();
  return results;
}

// Function to summarize axe-core results using GPT-4
async function summarizeResults(results) {
  // Build the prompt with both violations and passes summaries
  const violationDescriptions = results.violations.map(violation => {
    return `Issue: ${violation.description} (Impact: ${violation.impact}).`;
  }).join("\n");

  const passDescriptions = results.passes.map(pass => {
    return `Good Practice: ${pass.description}.`;
  }).join("\n");

  const fullPrompt = `
    Here is an accessibility audit report from axe-core:
    
    Issues Found:
    ${violationDescriptions}

    Good Practices:
    ${passDescriptions}

    Please provide a concise summary that highlights both areas for improvement and commendable practices, focusing on what the website owners should prioritize fixing and what they're doing well to support accessibility.
  `;

  // Generate a summary with OpenAI's GPT-4 model
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: fullPrompt },
    ],
  });

  return completion.choices[0].message.content.trim();
}

// Main function to run the audit and generate the summary
async function auditAndSummarize(url) {
  const results = await runAxeAudit(url);
  const summary = await summarizeResults(results);

  console.log("Accessibility Summary:");
  console.log(summary);
}

// Run the function with your target URL
auditAndSummarize('https://shopscentos.com/');