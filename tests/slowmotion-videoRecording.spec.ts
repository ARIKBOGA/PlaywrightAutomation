import { test, expect, chromium } from "@playwright/test";

test("Slow motion video recording", async () => {
  // launch a browser
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  // create a context
  const context = await browser.newContext({
    recordVideo: {
      dir: "videos/",
      size: { width: 800, height: 600 },
    },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  });

  // create a page
  const page = await context.newPage();

  // Enable slow motion for the page
  await page.goto("https://www.amazon.com/");

  // Pop-up check
  const alertSubmitButton = page
    .getByRole("button", { name: "Submit" })
    .first();
  if (await alertSubmitButton.isVisible()) {
    console.log("Pop-up is visible. Clicking the Submit button.");
    await alertSubmitButton.click();
    await page.waitForTimeout(2000);
  } else {
    console.log("Pop-up did not appear.");
  }

  // Search for a product
  const searchBox = page.locator('input[name="field-keywords"]');
  await searchBox.click();
  await searchBox.fill("Laptop");
  await searchBox.press("Enter");

  // Wait for the page to load
  await page.waitForLoadState("domcontentloaded");

  // Assert the title of the page
  try {
    await expect(page).toHaveTitle(/.*Laptop/, { timeout: 10000 });
    console.log("Title check passed: ", await page.title());
  } catch (error) {
    console.error("Title check failed. Taking screenshot...");
    await page.screenshot({ path: "screenshot_failed_title.png" });
    throw error;
  }

  // Close the browser
  
  //await page.close();
  await context.close();
  //await browser.close();
});
