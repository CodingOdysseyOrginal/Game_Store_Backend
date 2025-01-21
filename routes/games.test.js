import { test, expect, describe } from "vitest";
import request from "supertest";

import app from "../app.js";

describe("Testing GET ALL request", () => {
  test("working route", async () => {
    // ARRANGE: Send GET request to get all games
    const response = await request(app).get("/games");

    // use as reference
    // console.log(response.body)

    // TESTS:
    // 1. Check that response's content type is JSON
    expect(response.headers["content-type"]).toMatch(/application\/json/);

    // 2. Check if 'success' field is true
    expect(response.body.success).toEqual(true);

    // 3. Check if the response body is an object
    expect(typeof response.body).toBe("object");

    // 4. Check if 'payload' is defined and is an array
    if (response.body.payload) {
      expect(Array.isArray(response.body.payload)).toBe(true);

      // 5. Check different properties of the array
      response.body.payload.forEach((game) => {
        expect(game).toHaveProperty("id");
        expect(game).toHaveProperty("name");  
        expect(game).toHaveProperty("rating");  
        expect(game).toHaveProperty("category");  
        expect(game).toHaveProperty("selection"); 
        
        //Check data types of each porperty
        expect(typeof game.id).toBe("number");
        expect(typeof game.name).toBe("string");
        expect(typeof game.rating).toBe("string");
        expect(typeof game.category).toBe("string");
        expect(typeof game.selection).toBe("string");
      });
    } else {
      console.warn("Payload is undefined or null.");
    }
  });
});
