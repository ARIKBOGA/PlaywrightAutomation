import {test, expect} from '@playwright/test';


test('Amazon', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.locator('[type="submit"]').click();
    await page.locator('input[name="field-keywords"]').click();
    await page.locator('input[name="field-keywords"]').fill('Laptop');
    await page.locator('input[name="field-keywords"]').press('Enter');

    await expect(page).toHaveTitle('Amazon.com : Laptop');
    await expect(page.locator('text=HP 15 Laptop')).toBeVisible();
});
