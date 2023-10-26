const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "collection" ORDER BY "artist_name" ASC;`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error GETTING collection: ', error);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
    const newRecord = req.body;
    console.log('Testing:', req.body);
    console.log("User ID is: ", req.user.id);
    // Parse the date as a string
    const parsedReleaseDate = new Date(newRecord.releaseDate).toISOString();
    const queryText = `INSERT INTO "collection" ("user_id", "artist_name", "album_name", "release_date", "tracklist")
                       VALUES ($1, $2, $3, $4, $5);`;
    const queryValues = [
      req.user.id,
      newRecord.artistName,
      newRecord.albumName,
      parsedReleaseDate,
      newRecord.tracklist
    ];
    pool.query(queryText, queryValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error POSTING new record: ', error);
      });
  });
  


module.exports = router;
