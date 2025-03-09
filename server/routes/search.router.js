const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Ensure environment variables are loaded

const router = express.Router();

const DISCOGS_API_KEY = process.env.DISCOGS_API_KEY;


/**
 * GET route to search Discogs API
 */
router.get("/", async (req, res) => {
  const search = req.query.search;
  const limit = req.query.limit || 5; // Allow dynamic limit, default to 5

  if (!search) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const response = await axios.get(
      `https://api.discogs.com/database/search?q=${encodeURIComponent(search)}&type=release&token=${DISCOGS_API_KEY}&limit=${limit}`
    );
    res.json(response.data.results); // Send back search results
  } catch (error) {
    console.error("GET /albums fail:", error.response ? error.response.data : error);
    res.status(500).json({ error: "Failed to fetch data from Discogs" });
  }
});

module.exports = router;
