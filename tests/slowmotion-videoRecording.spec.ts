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

  // Enable slow motion
  // Amazon'a git
  await page.goto("https://www.amazon.com/");

  // Pop-up kontrolü ve kapatma
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

  // Arama alanını bul ve doldur
  const searchBox = page.locator('input[name="field-keywords"]');
  await searchBox.click();
  await searchBox.fill("Laptop");
  await searchBox.press("Enter");

  // Sayfa yüklenmesini bekle
  await page.waitForLoadState("domcontentloaded");

  // Başlığı kontrol et
  try {
    await expect(page).toHaveTitle(/.*Laptop/, { timeout: 10000 });
    console.log("Title check passed: ", await page.title());
  } catch (error) {
    console.error("Title check failed. Taking screenshot...");
    await page.screenshot({ path: "screenshot_failed_title.png" });
    throw error;
  }

  // Video kaydını durdur
  //await page.close();
  await context.close();
  //await browser.close();
});
