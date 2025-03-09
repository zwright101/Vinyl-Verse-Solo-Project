const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
require("dotenv").config();

const DISCOGS_API_KEY = process.env.DISCOGS_API_KEY;

router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&token=${DISCOGS_API_KEY}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching from Discogs:", error);
    res.status(500).json({ error: "Failed to fetch data from Discogs" });
  }
});

module.exports = router;
