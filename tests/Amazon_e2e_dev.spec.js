import { test, expect } from "@playwright/test";

test("Amazon", async ({ browser }) => {
  // Tarayıcı için özel bir context oluşturun, video kaydını etkinleştirin
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    locale: "en-US",
    recordVideo: { dir: "videos/", size: { width: 1280, height: 720 } }, // Video kaydı etkin
  });
  const page = await context.newPage();

  // Amazon'a git
  await page.goto("https://www.amazon.com/");

  // Pop-up kontrolü ve kapatma
  const alertSubmitButton = page.getByRole("button", { name: "Submit" }).first();
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

  // Test tamamlandıktan sonra tarayıcı context'ini kapat
  await context.close();
});
