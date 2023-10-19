import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>
            Vinyl verse is a social media app designed for the lovers of music and collectors
            of vinyl records. After signing up, jump into the Verse and begin adding your records
            to your collection!
        </p>

        <p>
            Once you're signed in and ready to add, navigate to the Add a Record page 
            where you'll be able to search for your record and add it to your own digital collection
            to display to your friends and other lovers of music! If there isn't an album for you to quick add, 
            don't worry! You'll be able to manually enter a record to your collection using a couple of the 
            key fields like artist and album name and submit it! If you come across a user or have a friend who shares similar music tastes, 
            feel free to let them know by commenting on some of their albums by clicking the record in their collection and leaving a comment or recommendation! 
          </p>
      </div>
    </div>
  );
}

export default AboutPage;
