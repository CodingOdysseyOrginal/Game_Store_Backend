import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import app from "../../app.js";

// Import the entire mocked module
import * as gameModel from "../../models/games.js"; 

// Mock Supabase interaction to prevent real DB modification
vi.mock("../../models/games.js", () => ({
  upDateGameByIdConnectedToDB: vi.fn(),
}));

describe("PATCH /games/:id", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mock calls before each test
  });

  it("should update the game and return updated data", async () => {
    const mockUpdatedGame = {
      id: 1,
      name: "Mock Game",
      rating: 9.5,
      category: "Action",
      multiplayer: true,
      descript: "A cool game",
      release_date: "2023-10-15",
      age_rating: "18",
      company: "Gaming Corp",
    };

    gameModel.upDateGameByIdConnectedToDB.mockResolvedValue(mockUpdatedGame);

    const response = await request(app)
      .patch("/games/1")
      .send({ rating: 9.5, category: "Action" })
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "Game updated successfully",
      data: mockUpdatedGame,
    });

    expect(gameModel.upDateGameByIdConnectedToDB).toHaveBeenCalledWith("1", {
      rating: 9.5,
      category: "Action",
    });
  });

  it("should return 400 if no update fields are provided", async () => {
    const response = await request(app).patch("/games/1").send({}).expect(400);

    expect(response.body).toEqual({
      success: false,
      message: "No update fields provided.",
    });

    expect(gameModel.upDateGameByIdConnectedToDB).not.toHaveBeenCalled();
  });

  it("should return 404 if game is not found", async () => {
    gameModel.upDateGameByIdConnectedToDB.mockRejectedValue(
      new Error("Game with ID 1 not found.")
    );

    const response = await request(app)
      .patch("/games/1")
      .send({ rating: 8.0 })
      .expect(404); // Corrected from 400 to 404

    expect(response.body).toEqual({
      success: false,
      message: "Game with ID 1 not found.",
    });

    expect(gameModel.upDateGameByIdConnectedToDB).toHaveBeenCalledWith("1", {
      rating: 8.0,
    });
  });
});
