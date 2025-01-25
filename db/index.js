import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Retrieves the database connection from the string.
// make sure to reinstall the .env file with boht the string adn port.
const databaseString = process.env.DB_CONNECTION;

if (!databaseString) {
  throw new Error(
    "The connection to the database is not working so make sure you've put in the right parameters on the string OR youve not put in the .env file"
  );
}

// Set up a connection to pool and the database so the commands pass into the database.

export const pool = new pg.Pool({
  connectionString: databaseString,
  ssl: {
    rejectUnauthorized: false, // Allows for self-signed certificates, if necessary.
  },
});

pool.on("connect", () => {
    console.log("Connected to the database");
  });
  
  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });
