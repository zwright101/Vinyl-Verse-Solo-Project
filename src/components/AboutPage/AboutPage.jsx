import React from 'react';

function AboutPage() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>About Vinyl Verse</h1>
  
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ flex: 1, border: '1px solid black', padding: '20px', maxWidth: '400px' }}>
          <img src="/images/Dad.png" alt="Your Image" style={{ width: '100%', height: 'auto', margin: 'auto' }} />
          <p>
            Vinyl verse is a social media app designed for the lovers of music and collectors of vinyl records. 
            After signing up, jump into the Verse and begin adding your records to your collection!
          </p>

          <p>
            Like most people, growing up, music is heavily influenced on you by what your parents 
            listen to. I was no different. We would hear plenty of stories about the band my dad was in, 
            and car rides were filled with nothing but music spread across many genres. Though he's no longer here
            to enjoy Vinyl Verse, I'd like to think I had him in mind the entire time and combined my love of music 
            and technology to create something to further spread the love of music.
          </p>
        </div>

        <div style={{ flex: 1, border: '1px solid black', padding: '20px', maxWidth: '400px', marginLeft: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>Technologies used:</h2>
          <ul style={{ textAlign: 'left' }}>
            <li style={{ marginBottom: '10px' }}>React.js</li>
            <li style={{ marginBottom: '10px' }}>Redux</li>
            <li style={{ marginBottom: '10px' }}>Node</li>
            <li style={{ marginBottom: '10px' }}>Express</li>
            <li style={{ marginBottom: '10px' }}>Material UI</li>
            <li style={{ marginBottom: '10px' }}>PostgreSQL</li>
            {/* Add more list items here */}
          </ul>
          <br />
          <br />
          
          <p>
            A huge thanks to Tourmaline instructor Alex Bliss, as well as Chris Black, Marc McCarthy, 
            and the entire staff at Prime for their help and support along the way. 
          </p>
          
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
