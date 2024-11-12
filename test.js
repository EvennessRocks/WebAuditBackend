const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

async function runAxeAudit(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the target page
    await page.goto(url);

    // Inject axe-core into the page
    await page.evaluate(axeSource => {
        eval(axeSource);
    }, axeCore.source);

    // Run axe-core audit
    const results = await page.evaluate(async () => {
        return await axe.run();
    });

    // Log or save the results
    console.log(JSON.stringify(results, null, 2));

    await browser.close();
}

runAxeAudit('https://facebook.com');