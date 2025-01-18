import express from "express";
import { getAllGames } from "../controllers/games.js";



// allows express to be used as a route for the requests
const router = express.Router();


// GET Requests for all the movies
router.get( "/", getAllGames);

export default router