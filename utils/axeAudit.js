const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

exports.runAxeAudit = async (url) => {
  // Launch Puppeteer with additional flags for production environments
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add these flags
    headless: true, // Ensure the browser runs in headless mode (no GUI)
  });

  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(url);

  // Inject axe-core and run it
  await page.evaluate(axeSource => eval(axeSource), axeCore.source);
  const results = await page.evaluate(() => axe.run());

  await browser.close();
  return results;
};