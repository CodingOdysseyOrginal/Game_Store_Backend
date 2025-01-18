async function fetchGames() {
  try {
    const response = await fetch("http://localhost:5000/games", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON
    console.log(data); // Log the parsed data
  } catch (error) {
    console.error("Error fetching games:", error);
  }
}

fetchGames();
