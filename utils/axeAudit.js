const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

// Utility function to retry evaluations with custom timeouts
async function retryEvaluate(page, func, maxRetries = 3, timeout = 60000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await page.evaluate(func);
    } catch (error) {
      console.warn(`Evaluate attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await page.waitForTimeout(2000); // Wait before retrying
    }
  }
}

exports.runAxeAudit = async (url) => {
  let browser;
  try {
    // Launch Puppeteer with increased launch timeout and required flags
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      timeout: 60000  // Increase launch timeout to 60 seconds
    });

    const page = await browser.newPage();

    // Increase timeout for `goto`
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Inject axe-core library
    await page.evaluate(axeSource => eval(axeSource), axeCore.source);

    // Run axe.run() with retry and custom timeout
    const results = await retryEvaluate(page, () => axe.run());

    return results;
  } catch (error) {
    console.error(`Error during Axe audit: ${error}`);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};