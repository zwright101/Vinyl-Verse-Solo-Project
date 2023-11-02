import React from 'react';

function AboutPage() {
  return (
    <div>
      <h1>About Vinyl Verse</h1>
  
    <div className="container" style={{ display: 'flex' }}>
      <div style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
      <img src="/images/Dad.png" alt="Your Image" style={{ width: 'auto', height: 'auto', alignContent: 'center'}} />
        <p>
          Vinyl verse is a social media app designed for the lovers of music and collectors of vinyl records. 
          After signing up, jump into the Verse and begin adding your records to your collection!
        </p>

        {/* <p>
          Once you're signed in and ready to add, navigate to the Add a Record page where you'll be able to 
          search for your record and add it to your own digital collection to display to your friends and other lovers of music! 
          If there isn't an album for you to quick add, don't worry! You'll be able to manually enter a record to your collection using 
          a couple of the key fields like artist and album name and submit it! If you come across a user or have a friend who shares similar music tastes, 
          feel free to let them know by commenting on some of their albums by clicking the record in their collection and leaving a comment or recommendation!
        </p> */}

        <p>
          Like most people, growing up, music is heavily influenced on you by what your parents 
          listen to. I was no different. We would hear plenty of stories about the band my dad was in, 
          and car rides were filled with nothing but music spread across many genres. Though he's no longer here
          to enjoy Vinyl Verse, I'd like to think I had him in mind the entire time and combined my love of music 
          and technology to create something to further spread the love of music.
        </p>

        
      </div>

      <div style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
        <ol>
          <h2>Technologies used: </h2>
          <li>React.js</li>
          <li>Redux</li>
          <li>Node</li>
          <li>Express</li>
          <li>Material UI</li>
          <li>PostgreSQL</li>
          {/* Add more list items here */}
        </ol>
        <br />
        <br />
        
        <p>
          A huge thanks to Tourmaline instructor Alex Bliss, as well as Chris Black, Marc McCarthy, 
          and the entire staff at Prime for their help and support along the way. 
        </p>
        <br />
        <p>
          A big thanks as well to the rest of my cohort mates for making Wednesday and Thursday nights
          a little more enjoyable as we embark on this new journey of software development!
        </p>
      </div>
    </div>
    </div>
  );
}

export default AboutPage;
