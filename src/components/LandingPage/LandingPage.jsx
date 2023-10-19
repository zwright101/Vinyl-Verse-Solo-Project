import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to the Verse!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
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

          <p>
            
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already in the Verse?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
