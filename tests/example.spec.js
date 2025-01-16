// @ts-check
const { test, expect } = require("@playwright/test");

let browserContext;
let page;
test.beforeAll(async ({ browser }) => {
  // Start tracing
  browserContext = await browser.newContext();
  await browserContext.tracing.start({ screenshots: true, snapshots: true });
  page = await browserContext.newPage();
});

test.afterAll(async () => {
  // Stop tracing
  await browserContext.tracing.stop({ path: "example-test-trace_2.zip" });
});

test("has title", async () => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.locator("text=Get started");

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute("href", "/docs/intro");

  // Click the getStarted link
  await getStarted.click();

  // Expect the URL contains intro.
  await expect(page).toHaveURL(/.*intro/);

});

test("get started link", async () => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
