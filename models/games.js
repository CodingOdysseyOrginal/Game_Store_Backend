import { pool } from "../db/index.js";

export async function getGameFromDB() {
  try {
    const result = await pool.query("SELECT * FROM game");
    return result.rows;
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
}

export async function getGameIdFromDB(gameId) {
  try {
    const data = await pool.query("SELECT * FROM game WHERE id = $1;", [
      gameId,
    ]);
    if (data.rows.length === 0) {
      throw new Error(`Game with ID ${gameId} not found`);
    }
    return data.rows[0];
  } catch (error) {
    console.error("Error fetching game from database:", error.message);
    throw error; 
  }
}
