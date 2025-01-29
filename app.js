import express from "express";
import morgan from "morgan";
import cors from "cors";
import gameRouter from "./routes/games.js";

const app = express();

// Middleware to log the HTTP request
app.use(morgan("dev"));

// Middleware to handle CORS
//Look into CORS more
app.use(cors());  // Enable CORS for all origins

// Middleware to parse incoming JSON
app.use(express.json());

// Set root and define the games route
app.use("/games", gameRouter);

// Export the app for Vercel (no need to listen on a specific port unles in local host)
export default app;
