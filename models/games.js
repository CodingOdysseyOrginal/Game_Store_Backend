import { pool } from "../db/index.js";

// Get all games from DB
export async function getGameFromDB() {
  try {
    const result = await pool.query("SELECT * FROM game");
    return result.rows;
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
}

// Get game by ID from DB
export async function getGameIdFromDB(gameId) {
  try {
    const data = await pool.query("SELECT * FROM game WHERE id = $1;", [gameId]);
    if (data.rows.length === 0) {
      throw new Error(`Game with ID ${gameId} not found`);
    }
    return data.rows[0];
  } catch (error) {
    console.error("Error fetching game from database:", error.message);
    throw error;
  }
}

// Insert a new game into the database
export async function insertGameToDB(
  name,
  rating,
  category,
  multiplayer,
  descript,
  release_date,
  age_rating,
  company
) {
  try {
    // Validate required fields
    const requiredFields = {
      name,
      rating,
      category,
      multiplayer, 
      descript,
      release_date,
      age_rating,
      company,
    };

    const missingFields = Object.keys(requiredFields).filter(
      (field) => requiredFields[field] === undefined || requiredFields[field] === null
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required field(s): ${missingFields.join(", ")}`
      );
    }
//SQL commands to insert new game with correct requirments.
    const query = `
      INSERT INTO game (name, rating, category, multiplayer, descript, release_date, age_rating, company)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      name,
      rating,
      category,
      multiplayer, 
      descript,
      release_date,
      age_rating,
      company,
    ];
//Returns confirmation of new game being made. 
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error inserting game into database:", error.message);
    throw new Error(error.message);
  }
}
