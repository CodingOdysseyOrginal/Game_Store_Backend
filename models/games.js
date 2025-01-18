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