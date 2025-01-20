import { test, expect } from "@playwright/test";

test("Selectors Demo", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // using id in attribute=value selector
  await page.click("id=user-name");
  await page.locator("id=user-name").fill("Einstein");

  // using id in css selector
  await page.locator('[id="user-name"]').fill("standard_user");
  
  // using xpath with name attribute
  await page.locator("//input[@name='password']").click();

  // using data-test attribute
  await page.locator('[data-test="password"]').fill("secret_sauce");
  
  // using text in css selector
  const loginButton = page.locator(':has-text("Login")');
  //await loginButton.click();
  // using css selector directly with id
  await page.locator('#login-button').click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});