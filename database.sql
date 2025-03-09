
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "collection" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "artist_name" VARCHAR (100) NOT NULL,
    "album_name" VARCHAR (100) NOT NULL,
    "release_date" TEXT,
    "tracklist" TEXT,
    "album_artwork" VARCHAR (2000)
);

INSERT INTO "collection" ("user_id", "artist_name", "album_name", "release_date", "tracklist", "album_artwork")
SELECT  "user_id", "artist_name", "album_name", "release_date", "tracklist", "album_artwork"
FROM "collection";