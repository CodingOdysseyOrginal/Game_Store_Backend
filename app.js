// import modules 
import express from "express";
import morgan from "morgan";
import cors from "cors";  

import gameRouter from "./routes/games.js"

// make app = express;
const app = express();

// Middleware to log the HTTP request
app.use(morgan("dev"));

// Middleware to handle CORS
app.use(cors());  // Enable CORS for all origins

// to let the system know that JSON is incoming with each request
app.use(express.json());

// set root
app.use("/games", gameRouter)

export default app;
