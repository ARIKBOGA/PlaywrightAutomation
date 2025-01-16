import {test, expect} from '@playwright/test';


test('Amazon', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.getByRole('button', { name: 'Submit' }).first().click();
    await page.locator('input[name="field-keywords"]').click();
    await page.locator('input[name="field-keywords"]').fill('Laptop');
    await page.locator('input[name="field-keywords"]').press('Enter');

    await expect(page).toHaveTitle('Amazon.com : Laptop');

});
