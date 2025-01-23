
import { test, expect } from '@playwright/test';

test('Record Demo 2',async ({page}) => {
  
  
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="item-1-img-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();


});


test.use({
  colorScheme: 'dark'
});

test('playwright website navigation test DARK mode', async ({ page }) => {
  await page.goto('http://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'Frames' }).click();
  await page.getByRole('link', { name: 'Mock APIs' }).click();
  await page.getByRole('link', { name: 'Page object models' }).click();
  await page.getByRole('tab', { name: 'JavaScript' }).first().click();
  await page.getByRole('tab', { name: 'Library' }).first().click();
  await page.getByRole('tab', { name: 'TypeScript' }).first().click();
});