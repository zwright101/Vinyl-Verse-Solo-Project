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
  const collection = [req.body.user_id, req.body.artist_name, req.body.album_name, req.body.release_date, req.body.tracklist];
  console.log(req.body);
  const queryText = `INSERT INTO "collection" ("user_id", "artist_name", "album_name", "release_date", "tracklist")
                     VALUES ($1, $2, $3, $4, $5);`;
  pool.query(queryText, collection).then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log("Error POSTING collection: ", error);
    res.sendStatus(500);
  })
});

module.exports = router;
