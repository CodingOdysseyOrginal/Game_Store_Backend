import express from "express";
import {
  getAllGames,
  getById,
  createGame,
  updateGameByID,
  deleteGameById
} from "../controllers/games.js";

// allows express to be used as a route for the requests
const router = express.Router();

// GET Requests for all the games
router.get("/", getAllGames);

//GET BY ID Requests for one game at a time
router.get("/:id", getById);

//Create new game
router.post("/", createGame);

//Update Game
router.patch("/:id", updateGameByID);

//Delete game by ID
router.delete("/:id", deleteGameById);

export default router;
