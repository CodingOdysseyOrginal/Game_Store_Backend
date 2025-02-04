import supabase from "../db/index.js";

// Get all games from DB
export async function getGameFromDB() {
  try {
    const { data, error } = await supabase.from('game').select('*');
    if (error) {
      throw new Error(`Error fetching games: ${error.message}`);
    }
    return data;
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
}

// Get game by ID from DB
export async function getGameIdFromDB(gameId) {
  try {
    const { data, error } = await supabase
      .from('game')
      .select('*')
      .eq('id', gameId)
      .single(); // `single()` returns one row if found, otherwise null

    if (error) {
      throw new Error(`Error fetching game by ID: ${error.message}`);
    }

    if (!data) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching game from database:", error.message);
    throw error;
  }
}

// Insert a new game into the database
export async function insertGameToDB(
  name,
  rating,
  category,
  multiplayer,
  descript,
  release_date,
  age_rating,
  company
) {
  try {
    // Validate required fields
    const requiredFields = {
      name,
      rating,
      category,
      multiplayer,
      descript,
      release_date,
      age_rating,
      company,
    };

    const missingFields = Object.keys(requiredFields).filter(
      (field) => requiredFields[field] === undefined || requiredFields[field] === null
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required field(s): ${missingFields.join(", ")}`
      );
    }

    const { data, error } = await supabase
      .from('game')
      .insert([
        {
          name,
          rating,
          category,
          multiplayer,
          descript,
          release_date,
          age_rating,
          company,
        }
      ])
      .select(); // To get the inserted data

    if (error) {
      throw new Error(`Error inserting game: ${error.message}`);
    }

    return data[0]; // Return the first item in the inserted array
  } catch (error) {
    console.error("Error inserting game into database:", error.message);
    throw new Error(error.message);
  }
}
