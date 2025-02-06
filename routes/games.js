import express from "express";
import { getAllGames, getById, createGame, updateGameByID } from "../controllers/games.js";



// allows express to be used as a route for the requests
const router = express.Router();


// GET Requests for all the games
router.get( "/", getAllGames);

//GET BY ID Requests for one game at a time
router.get("/:id", getById)

//Create new game
router.post("/", createGame);

//update Game
router.patch("/:id", updateGameByID)


export default router