// commands from the database controls.
import { getGameFromDB, getGameIdFromDB } from "../models/games.js";

// GET all request formatted in json 
export async function getAllGames(req, res) {
  try {
    const allGame = await getGameFromDB();
    res.status(200).json({ success: true, payload: allGame });
  } catch (error) {
    console.error("Error in getAllGames controller", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

//GET BY ID request formatted in Json
export async function getById(req, res) {
  try{
    const { id } = req.params;
    const game = await getGameIdFromDB(id);
    res.status(200).json({
      success: true,
      payload: game,
    });
    
 } catch (error) {
  console.error("Error in getByIdcontrollers", error);
  res.status(500).json({status: "error", message: error.message})
 }
}