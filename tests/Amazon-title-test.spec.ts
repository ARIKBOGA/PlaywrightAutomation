import { test, expect, chromium } from "@playwright/test";

test("Slow motion video recording", async ({ page }) => {
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

  await page.close();
  
});
