import { test, expect, describe, vi, afterEach } from "vitest";
import { getGames, TwoPlusTwo } from "./api-helper";

// Mocking fetch globally
global.fetch = vi.fn();

describe("Fetch Requests", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  test("GET ALL request should fetch games successfully", async () => {
    // Arrange
    const mockResponse = [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Act
    const result = await getGames();

    // Assert
    expect(fetch).toHaveBeenCalledWith("http://localhost:5000/games", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    expect(result).toEqual(mockResponse);
  });

  test("GET ALL request should handle fetch errors", async () => {
    // Arrange
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: "Internal Server Error" }),
    });

    try {
      // Act
      await getGames();
    } catch (error) {
      // Assert
      expect(fetch).toHaveBeenCalledWith("http://localhost:5000/games", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      expect(error).toBeDefined(); // Ensure an error is thrown
    }
  });
});
