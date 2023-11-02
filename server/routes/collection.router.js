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

// GET route for specific album to edit
router.get('/edit-album/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `SELECT * FROM "collection" WHERE id = $1;`;
    pool.query(queryText, [id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error fetching album for editing: ', error);
        res.sendStatus(500);
      });
  });

// GET route for specific user's collection
router.get('/:id', (req, res) => {
    let id = req.params.id;
    const queryText = `SELECT * FROM "collection" 
                       JOIN "user" ON "collection"."user_id" = "user"."id"
                       WHERE "user"."id" = ${id}`
    pool.query(queryText, [id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error in getting specific collection' , error);
        res.sendStatus(500)
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
    const newRecord = req.body;
    console.log('Testing:', req.body);
    console.log("User ID is: ", req.user.id);
    // Parse the date as a string
    const newReleaseDate = new Date(newRecord.releaseDate).toISOString();
    const queryText = `INSERT INTO "collection" ("user_id", "artist_name", "album_name", "release_date", "tracklist", "album_artwork")
                       VALUES ($1, $2, $3, $4, $5, $6);`;
    const queryValues = [
      req.user.id,
      newRecord.artistName,
      newRecord.albumName,
      newReleaseDate,
      newRecord.tracklist,
      newRecord.imageUrl
    ];
    pool.query(queryText, queryValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error POSTING new record: ', error);
      });
  });


  // PUT route 


  // DELETE route

  router.delete('/:id', (req, res) => {
    const deleteId = req.params.id;
    let queryText = `DELETE FROM "collection" WHERE "id"=$1;`;
    pool.query(queryText, [deleteId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`);
        res.sendStatus(500);
    })
})
  


module.exports = router;
