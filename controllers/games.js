// Function to validate required fields
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
  upDateGameByIdConnectedToDB,
  removeGameByIdFromDB
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

    // Respond with the new game data
    res.status(201).json({ success: true, data: game });
  } catch (error) {
    const statusCode = error.message.includes("Missing required field") ? 422 : 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
}

//Update by id 
export async function updateGameByID(req, res) {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    // make sure the length is one 
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "No update fields provided." });
    }

    const updatedGame = await upDateGameByIdConnectedToDB(id, updates);

    res.status(200).json({ success: true, message: "Game updated successfully", data: updatedGame });
  } catch (error) {
    console.error("Error in updateGameByID controller", error);
    res.status(404).json({ success: false, message: error.message });
  }
}

//Delete game by Id
export async function deleteGameById(req, res) {
  try {
    const id = req.params.id; 
    const game = await removeGameByIdFromDB(id); 

    if (!game) {
      return res.status(404).json({
        status: "fail",
        message: "Game not found",
      });
    }

    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

