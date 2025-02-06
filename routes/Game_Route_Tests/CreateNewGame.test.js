import request from "supertest";
import app from "../../app.js"; 
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as gameModel from "../../models/games.js";

vi.mock("../../models/games.js");

describe("POST /games", () => {
  const validGameData = {
    name: "Test Game",
    rating: 8.5,
    category: "Action",
    multiplayer: true,
    descript: "An exciting new action game.",
    release_date: "2023-11-15",
    age_rating: "18+",
    company: "Test Studios",
  };

  beforeEach(() => {
    vi.restoreAllMocks(); 
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new game and return 201 status", async () => {
    gameModel.insertGameToDB.mockResolvedValue({ id: 1, ...validGameData });

    const response = await request(app)
      .post("/games")
      .send(validGameData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject(validGameData);
  });

  it("should return 422 if required fields are missing", async () => {
    const invalidGameData = { name: "Incomplete Game" }; 

    const response = await request(app)
      .post("/games")
      .send(invalidGameData)
      .expect(422);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain("Missing required field");
  });

  it("should return 500 if an unexpected error occurs", async () => {
    gameModel.insertGameToDB.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post("/games")
      .send(validGameData)
      .expect(500);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Database error");
  });
});
