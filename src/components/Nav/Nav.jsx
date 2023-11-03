import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title"></h2>
        <div className="logo-container">
        <img src="/images/NEWVinylVerseLogo.png" alt="Vinyl Verse Logo" className="Vinyl-Verse-Logo" style={{ width: '150px', height: '150px'}}/>
      </div>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="home" to="/user">
              Home
            </Link>

            <Link className="collection" to="/collection">
              My Collection
            </Link>

            <Link className="add-record" to="/add-custom-record">
              Add a Record
            </Link>

            <LogOutButton className="logout" />
          </>
        )}

        <Link className="about" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
