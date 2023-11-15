
# Vinyl Verse

## Description

Duration: 3 Weeks

Vinyl Verse is a social media lite app where lovers of music and collectors of vinyl records can sign up and begin adding records to their account to display as part of their digital collection!

To see the fully functional site, please visit: https://www.vinylverse.io/#/home


### Prerequisites

- Postgres SQL
- [Node.js](https://nodejs.org/en/)


## Installation

1. Create a database named `prime_app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? 

1. After initial signin, head to the "Add a record" page and begin adding to your collection!
2. When adding a record, make sure to input the artist name, album name, release date, tracklist, and include an image URL from the web to display the albums artwork!
3. After clicking add record, navigate back to your collection and the albums will display there (both with the 5 most recent albums added and the collection as a whole sorted alphabetically by artist!)
4. If you realize you spelled something wrong or wanted to add the tracklist afterwards, hit one of the records and hit the edit button to be forwarded to the page where you can add anything you might have missed. 
5. If you need to remove a record from your collection, go ahead and hit the delete button (be sure this is something you want to do because once it's hit, it's gone. But don't worry, you can certainly re-add it if you make a mistake!).


## Built With

- Axios
- Express
- React.js
- Redux and Redux Sagas
- Material UI

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. A huge thanks to Tourmaline instructor Alex Bliss, as well as Chris Black, Marc McCarthy, and the entire staff at Prime for their help and support along the way. A big thanks as well to the rest of my cohort mates for making Wednesday and Thursday nights a little more enjoyable as we embark on this new journey of software development!

## Support
If you have suggestions or issues, please email me at zwright101@gmail.com
