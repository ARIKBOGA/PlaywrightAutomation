import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://www.bing.com/?toWww=1&redig=F07DAE08F0D747C79FA91F0B28626A98"
  );
  await page.getByLabel("characters out of 2000").click();
  await page.getByLabel("characters out of 2000").fill("selenium");
  await page.goto(
    "https://www.bing.com/search?q=selenium&form=QBLH&sp=-1&ghc=1&lq=0&pq=selenium&sc=13-8&qs=n&sk=&cvid=89549D713983415EAD7B06BDE50806C2&ghsh=0&ghacc=0&ghpl="
  );
  const page1Promise = page.waitForEvent("popup");
  await page
    .getByRole("heading", { name: "Selenium", exact: true })
    .getByRole("link")
    .click();
  const page1 = await page1Promise;
  await page1
    .getByRole("link", { name: "Read more ", exact: true })
    .nth(2)
    .click();
  await page1
    .getByRole("link", { name: "Getting Started", exact: true })
    .click();
});


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
  
  // using css selector directly with id
  await page.locator('#login-button').click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});