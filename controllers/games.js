// Utility function to validate required fields
//This is to check if the game is passing the correct data for a new game to be created. 
function validateRequiredFields(fields) {
  const missingFields = Object.keys(fields).filter((field) => fields[field] === undefined || fields[field] === null);
  if (missingFields.length > 0) {
    throw new Error(`Missing required field(s): ${missingFields.join(", ")}`);
  }
}
//Imported DB commands 
import {
  getGameFromDB,
  getGameIdFromDB,
  insertGameToDB,
} from "../models/games.js"; 

// GET all request
export async function getAllGames(req, res) {
  try {
    const allGame = await getGameFromDB();
    res.status(200).json({ success: true, payload: allGame });
  } catch (error) {
    console.error("Error in getAllGames controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET BY ID request
export async function getById(req, res) {
  try {
    const { id } = req.params;
    const game = await getGameIdFromDB(id);
    res.status(200).json({ success: true, payload: game });
  } catch (error) {
    console.error("Error in getById controller", error);
    res.status(404).json({ success: false, message: error.message });
  }
}

// Create new Game
export async function createGame(req, res) {
  try {
    const {
      name,
      rating,
      category,
      multiplayer,
      descript,
      release_date,
      age_rating,
      company,
    } = req.body;

    // Validate required fields
    validateRequiredFields({
      name,
      rating,
      category,
      multiplayer,
      descript,
      release_date,
      age_rating,
      company,
    });

    const game = await insertGameToDB(
      name,
      rating,
      category,
      multiplayer,
      descript,
      release_date,
      age_rating,
      company
    );

    // Respond with the newly created game data
    res.status(201).json({ success: true, data: game });
  } catch (error) {
    const statusCode = error.message.includes("Missing required field") ? 422 : 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
}
