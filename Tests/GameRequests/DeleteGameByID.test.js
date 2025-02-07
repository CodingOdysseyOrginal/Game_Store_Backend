import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import app from "../../app.js"; 
import * as gameModel from "../../models/games.js"; 

vi.mock("../../models/games.js", () => ({
  removeGameByIdFromDB: vi.fn(),
}));

describe("DELETE /games/:id", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("should delete the game and return 204 status", async () => {
    gameModel.removeGameByIdFromDB.mockResolvedValue({
      id: 1,
      name: "Mock Game",
    });

    const response = await request(app).delete("/games/1").expect(204);

    expect(response.body).toEqual({}); // 204 No Content means an empty response body
    expect(gameModel.removeGameByIdFromDB).toHaveBeenCalledWith("1");
  });

  it("should return 404 if game is not found", async () => {
    // Update the mock to reject with a specific error message
    gameModel.removeGameByIdFromDB.mockRejectedValue(
      new Error("Game with ID 1 not found.") // Simulate the game not found scenario
    );

    const response = await request(app).delete("/games/1").expect(404);

    expect(response.body).toEqual({
      status: "fail",
      message: "Game with ID 1 not found.",
    });

    expect(gameModel.removeGameByIdFromDB).toHaveBeenCalledWith("1");
  });

  it("should return 500 if an internal server error occurs", async () => {
    // Simulate a general error (not game not found)
    gameModel.removeGameByIdFromDB.mockRejectedValue(new Error("Database error"));

    const response = await request(app).delete("/games/1").expect(500);

    expect(response.body).toEqual({
      status: "error",
      message: "Database error",
    });

    expect(gameModel.removeGameByIdFromDB).toHaveBeenCalledWith("1");
  });
});
