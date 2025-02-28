import { faker } from "@faker-js/faker/locale/en";
import fs from "fs";
import { APIResponse, expect, test } from "@playwright/test";

test.describe("BOOKSTORE API tests", () => {
    let response: APIResponse | null = null;
    let orderID: number = 0;
  
    test("Book API test - Create an Access Token", async ({ request }) => {
        
      const clientName = faker.person.firstName();
      const clientEmail = faker.internet.email();
      response = await request.post(
        "https://simple-books-api.glitch.me" + "/api-clients/",
        {
          data: {
            clientName: clientName,
            clientEmail: clientEmail,
          },
        }
      );
      const body = await response.json();

      expect(response.status()).toBe(201);
      expect(response.ok()).toBeTruthy();
      expect(body).toHaveProperty("accessToken");
      expect(body.accessToken).not.toBeNull();
      
  
      console.log(`Generated Name:${clientName}`);
      console.log(`Generated Email:${clientEmail}`);
  
      // Save the access token to the .env file
      fs.writeFileSync(".env", `ACCESS_TOKEN=${body.accessToken}`);
    });

    
  });
  