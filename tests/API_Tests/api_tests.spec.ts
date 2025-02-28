import { test, expect, APIResponse } from "@playwright/test";

let response: APIResponse | null = null;

test.describe("API tests", () => {
  /**
   * This test sends a GET request to the Reqres API and verifies that the response is
   * successful and has the expected status code.
   */
  test("API test", async ({ request }) => {
    response = await request.get("https://reqres.in/api/users?page=2");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  /**
   * This test sends a GET request to the Reqres API to get the user with the ID of 2.
   * It verifies that the response is successful and has the expected status code.
   * It then verifies that the response body matches the expected results.
   */
  test("API test exercise 2", async ({ request }) => {
    response = await request.get("https://reqres.in/api/users/2");

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json(); // Parse the response body
    expect(responseBody.data.id).toBe(2);

    console.log("Response Body - Data: %s", responseBody.data);

    const url = responseBody.support.url;
    const text = responseBody.support.text;
    console.log("URL: %s", url);
    console.log("Text: %s", text);

    const allText = await response.text();
    console.log("Response Body - All Text: %s", allText);

    expect(allText).toContain("Weaver");
  });
});
