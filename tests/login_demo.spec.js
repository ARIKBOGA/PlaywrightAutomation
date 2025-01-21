import { test, expect } from "@playwright/test";
import { log } from "console";

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

  const element = page.getByRole("link", { name: "Admin" });
  await expect(element).toBeVisible();
});

test("Login test Applitools.com", async ({ page }) => {
  // Navigate to the page
  await page.goto("https://demo.applitools.com/");
  
  // Fill in username and password
  await page.getByPlaceholder("Enter your username").fill("username");
  await page.getByPlaceholder("Enter your password").fill("password");
  
  // Click the "Sign in" button
  await page.locator("text=Sign in").click();
  
  // Wait for the element to be visible
  await page.waitForSelector(".element-header", { state: "visible" });
  
  // Verify the text content
  const headerText = await page.locator(".element-header").first().textContent();
  expect(headerText).toContain("Financial Overview");
  
  // Log the text content to the console
  console.log(headerText);
});
