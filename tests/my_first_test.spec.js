const { test, expect } = require("@playwright/test");

test("My First Test", async ({ page }) => {
  
    await page.goto("https://google.com");

    await expect(page).toHaveTitle("Google");
    await expect(page).toHaveURL("https://www.google.com/");

});



test('test', async ({ page }) => {
  await page.goto('https://practice.cydeo.com/');
  await page.getByRole('link', { name: 'Hovers' }).click();
  await page.getByRole('img', { name: 'User Avatar' }).first().hover();
  await page.getByRole('link', { name: 'View profile' }).click();
  await page.goBack();
  await page.getByRole('img', { name: 'User Avatar' }).nth(1).hover();
  await expect(page.locator('#content')).toContainText('name: user2');
  await expect(page.getByRole('heading', { name: 'name: user2' })).toBeVisible();
});