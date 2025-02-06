import { test, expect, describe, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js";

// TEST GET BY ID 
describe("Test the overall route of the GET BY ID", () => {
  let response;

  beforeEach(async () => {
    response = await request(app).get("/games/1");
    // console.log("Response:", response.body);
  });

  test("should return JSON response", () => {
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("expect status code of 200", () => {
    expect(response.status).toBe(200);
  });

  test("should return a valid game object", () => {
    expect(response.body.success).toBe(true);
    expect(response.body.payload).toBeDefined(); 
    expect(response.body.payload).toHaveProperty("id");
    expect(response.body.payload).toHaveProperty("name");
    expect(response.body.payload).toHaveProperty("category");
    expect(response.body.payload).toHaveProperty("multiplayer");
    expect(response.body.payload).toHaveProperty("release_date");
    expect(response.body.payload).toHaveProperty("age_rating");
    expect(response.body.payload).toHaveProperty("company");
  });
});