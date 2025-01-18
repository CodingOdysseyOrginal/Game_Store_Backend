import app from "../app.js";
import dotenv from "dotenv";

dotenv.config(); 

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`IT'S ALIVE http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("Server error", err);
});