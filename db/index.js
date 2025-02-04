import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase connection details are missing in the .env file. Please check SUPABASE_URL and SUPABASE_ANON_KEY."
  );
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Connected to Supabase");

// Export Supabase client for use in other files
export default supabase;
