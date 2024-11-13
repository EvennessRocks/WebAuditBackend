const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

exports.runAxeAudit = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  await page.evaluate(axeSource => eval(axeSource), axeCore.source);
  const results = await page.evaluate(() => axe.run());

  await browser.close();
  return results;
};