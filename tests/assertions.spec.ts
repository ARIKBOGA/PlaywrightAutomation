import { test, expect } from "@playwright/test";

test("Assertions TypeScript example", async ({ page }) => {

    await page.goto("https://kitchen.applitools.com/");
    await page.pause();
    // ASSERTIONS
    // Check if the element is present
    await expect(page.locator('text=The Kitchen')).toHaveCount(1);
    
    // Check if the link elements count is 11
    await expect(page.locator('css=a>h3')).toHaveCount(11);
    
    // print the text of all the links
    const links = page.locator('css=a>h3');
    for (let i = 0; i < await links.count(); i++) {
        console.log(await links.nth(i).textContent());
    }

    if(await page.$('text=The Kitchen')){
        console.log("The Kitchen element is present");
        await page.locator('text=The Kitchen').click();
    }


});
