const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173');

  // Wait a moment for dynamic rendering and images to load
  await page.waitForTimeout(2000);

  // Take a screenshot
  await page.screenshot({ path: 'frontend_screenshot.png' });

  await browser.close();
})();
