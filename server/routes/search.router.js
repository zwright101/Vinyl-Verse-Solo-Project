const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const DISCOGS_API_KEY = process.env.DISCOGS_API_KEY;

router.get("/", async (req, res) => {
  const search = req.query.search;
  const limit = req.query.limit || 5;

  if (!search) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Step 1: Search for albums
    const searchResponse = await axios.get(
      `https://api.discogs.com/database/search`, {
        params: {
          q: search,
          type: "release",
          token: DISCOGS_API_KEY,
          format: "Vinyl", // Prioritize vinyl records
          per_page: limit,
          sort: "year",
          sort_order: "desc"
        }
      }
    );

    const albums = searchResponse.data.results;

    // Step 2: Fetch tracklist for each album using its `resource_url`
    const albumsWithTracklist = await Promise.all(
      albums.map(async (album) => {
        if (!album.resource_url) return null; // Skip if no resource URL

        try {
          const detailsResponse = await axios.get(`${album.resource_url}?token=${DISCOGS_API_KEY}`);
          const details = detailsResponse.data;

          return {
            id: album.id,
            title: album.title.replace(/ *\([^)]*\) */g, "").trim(), // Remove extra characters in parentheses
            artist: details.artists?.[0]?.name.replace(/\d+$/, "").trim() || "Unknown Artist", // Remove numbers from artist names
            year: details.year || "N/A",
            cover_image: album.cover_image || "",
            tracklist: details.tracklist ? details.tracklist.map((track) => track.title) : [],
          };
          
        } catch (error) {
          console.error(`Error fetching tracklist for ${album.title}:`, error);
          return null;
        }
      })
    );

    // Remove any null values (failed fetches)
    res.json(albumsWithTracklist.filter(Boolean));
  } catch (error) {
    console.error("GET /albums fail:", error.response ? error.response.data : error);
    res.status(500).json({ error: "Failed to fetch data from Discogs" });
  }
});

module.exports = router;
