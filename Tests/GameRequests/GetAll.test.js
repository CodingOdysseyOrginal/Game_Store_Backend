import { test, expect, describe, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js"; 

// GET ALL TEST 
describe("Testing GET /games request", () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get("/games");
  });

  test("should return JSON response", () => {
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("should have success field as true", () => {
    expect(response.body.success).toEqual(true);
  });

  test("should return an object as the body", () => {
    expect(typeof response.body).toBe("object");
  });

  describe("Payload checks", () => {
    test("should have a payload that is an array", () => {
      expect(Array.isArray(response.body.payload)).toBe(true);
    });

    test("should contain games with required properties", () => {
      response.body.payload.forEach((game) => {
        expect(game).toHaveProperty("id");
        expect(game).toHaveProperty("name");
        expect(game).toHaveProperty("rating");
        expect(game).toHaveProperty("category");
        expect(game).toHaveProperty("multiplayer");
      });
    });

    test("should validate property types of each game", () => {
      response.body.payload.forEach((game) => {
        expect(typeof game.id).toBe("number");
        expect(typeof game.name).toBe("string");
        expect(typeof game.rating).toBe("number"); 
        expect(typeof game.category).toBe("string");
        expect(typeof game.multiplayer).toBe("boolean");
      });
    });
  });
});
