import { test, expect } from "@playwright/test";

test.skip("@skip this test", async () => {});

test.fail("@fail this test", async () => {});

test.fixme("@fixme this test", async () => {
  // Fixme: This test is not implemented yet
});

test("@slow this test", async () => {
  // marks test as slow and triples the timeout
  test.slow();
});

// test.only("@only this test", async () => {
//   console.log("This test will be the only one to run");
// });

test.skip("This test will be skipped", async ({ page, browserName }) => {
    console.log("This test will be skipped");
});

test.skip("This test will be skipped on condition", async ({ page, browserName }) => {
    test.skip(browserName === "chromium", "This test will be skipped on webkit");
});
