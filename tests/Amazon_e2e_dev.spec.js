import { test, expect } from "@playwright/test";

test("Amazon", async ({ page }) => {
  await page.goto("https://www.amazon.com/");

  // for pop-up showing up sometimes
  // Check if the pop-up button is visible and handle it if present
  const alertSubmitButton = page.getByRole("button", { name: "Submit" }).first();

  if (await alertSubmitButton.isVisible()) {
    console.log("Pop-up is visible. Clicking the Submit button.");
    await alertSubmitButton.click();
  } else {
    console.log("Pop-up did not appear.");
  }
  await page.locator('input[name="field-keywords"]').click();
  await page.locator('input[name="field-keywords"]').fill("Laptop");
  await page.locator('input[name="field-keywords"]').press("Enter");

  await expect(page).toHaveTitle(/.*Laptop/);

  console.log(await page.title());
});
