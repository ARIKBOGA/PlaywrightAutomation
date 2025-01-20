import { test, expect } from "@playwright/test";

function getStringAfterColon(text) {
  const colonIndex = text.indexOf(": "); // Find the index of ": "
  if (colonIndex === -1) {
    return ""; // Return empty string if ": " is not found
  }
  return text.substring(colonIndex + 2); // Extract the substring after ": "
}

test("login test_1", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  const usernameContext = await page
    .locator("xpath=//p[@class='oxd-text oxd-text--p']")
    .first()
    .textContent();
  const username = getStringAfterColon(usernameContext);
  const passwordContext = await page
    .locator("xpath=//p[@class='oxd-text oxd-text--p']")
    .nth(1)
    .textContent();
  const password = getStringAfterColon(passwordContext);

  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);

  await page.getByRole("button", { name: "Login" }).click();

  const element = page.getByRole('link', { name: 'Admin' });
  await expect(element).toBeVisible();
});
