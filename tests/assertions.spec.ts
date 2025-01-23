import { test, expect } from "@playwright/test";

test("Assertions TypeScript example", async ({ page }) => {
  await page.goto("https://kitchen.applitools.com/");
  await page.pause();
  // ASSERTIONS
  // Check if the element is present
  await expect(page.locator("text=The Kitchen")).toHaveCount(1);

  // Check if the link elements count is 11
  await expect(page.locator("css=a>h3")).toHaveCount(11);

  // print the text of all the links
  const links = page.locator("css=a>h3");
  for (let i = 0; i < (await links.count()); i++) {
    console.log(await links.nth(i).textContent());
  }

  // Check if the element is present and click on it
  // The '$' returns boolean value
  if (await page.$("text=The Kitchen")) {
    console.log("The Kitchen element is present");
    await page.locator("text=The Kitchen").click();
  }

  // check if the element is visible or hidden
  await expect(page.locator("text=The Kitchen")).toBeVisible();
  await expect(page.locator("text=The Kitchen")).not.toBeHidden();

  // soft assertion - will not stop the execution if the element is not visible
  // await expect.soft(page.locator("text=The Kitchen")).toBeHidden();

  // check if the element is enabled or disabled
  await expect(page.locator("text=The Kitchen")).toBeEnabled();
  await expect(page.locator("text=The Kitchen")).not.toBeDisabled();

  // soft assertion - will not stop the execution if the element is not enabled
  // await expect.soft(page.locator("text=The Kitchen")).toBeDisabled();

  // check text of the element
  await expect(page.locator("text=The Kitchen")).toHaveText("The Kitchen");
  await expect(page.locator("text=The Kitchen")).not.toHaveText("ABCDEF");

  // check the attribute value of the element
  await expect(page.locator("text=The Kitchen")).toHaveAttribute(
    "class",
    /.*css-dpmy2a/ // regex: class value should contain 'css-dpmy2a' starts with any value
  );

  // check the class value of the element
  await expect(page.locator("text=The Kitchen")).toHaveClass(/.*css-dpmy2a/);

  // check the url and title of the page
  await expect(page).toHaveURL(/kitchen.applitools.com/);
  await expect(page).toHaveTitle(/.*Kitchen/);

  // visual validation
  await expect(page).toHaveScreenshot();
});
