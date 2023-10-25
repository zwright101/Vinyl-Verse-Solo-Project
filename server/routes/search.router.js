const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const discogs_api_key = process.env.DISCOGS_API_KEY;

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    let search = req.query.search;
    axios.get(`https://api.discogs.com/database/search?q=${search}&api_key=${discogs_api_key}&limit=5`)
    .then((response) => {
        res.send(response.data.data)
    })
    .catch((error) => {
        console.log("GET /albums fail: ", error);
        res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
