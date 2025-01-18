
// commands from the database controls.
import { getGameFromDB } from "../models/games.js";


// GET all request formated in json 
export async function getAllGames(req, res) {
  try {
    const allGame = await getGameFromDB();
    res.status(200).json({ status: "success", data: allGame });
  } catch (error) {
    console.error("Error in getAllGames controller", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
