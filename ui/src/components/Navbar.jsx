import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../UserContext';

function Navbar() {
  const [auth, setAuth] = useState(false);
  const { data, loading, getAuth } = useContext(UserContext);

  useEffect(() => {
    setAuth(getAuth());
  }, [data, loading, getAuth, setAuth]);

  return (
    <nav class='navbar'>
      <div class='navbar__container'>
        <a href='#home' id='navbar__logo'>
          Doctor
        </a>
        <div class='navbar__toggle' id='mobile-menu'>
          <span class='bar'></span> <span class='bar'></span>
          <span class='bar'></span>
        </div>

        {!auth ? (
          <ul class='navbar__menu'>
            <li class='navbar__item'>
              <a href='#about' class='navbar__links' id='about-page'>
                About
              </a>
            </li>
            <li class='navbar__item'>
              <a href='#services' class='navbar__links' id='services-page'>
                Services
              </a>
            </li>
            <li class='navbar__btn'>
              <a href='#sign-up' class='button' id='signup'>
                Sign Up
              </a>
            </li>
          </ul>
        ) : (
          <ul class='navbar__menu'>
            <li class='navbar__item'>
              <a href='#home' class='navbar__links' id='home-page'>
                Home
              </a>
            </li>
            <li class='navbar__item'>
              <a href='#about' class='navbar__links' id='about-page'>
                About
              </a>
            </li>
            <li class='navbar__item'>
              <a href='#services' class='navbar__links' id='services-page'>
                Services
              </a>
            </li>
          </ul>
        )}
        {/* <ul class='navbar__menu'>
          <li class='navbar__item'>
            <a href='#home' class='navbar__links' id='home-page'>
              Home
            </a>
          </li>
          <li class='navbar__item'>
            <a href='#about' class='navbar__links' id='about-page'>
              About
            </a>
          </li>
          <li class='navbar__item'>
            <a href='#services' class='navbar__links' id='services-page'>
              Services
            </a>
          </li>
          <li class='navbar__btn'>
            <a href='#sign-up' class='button' id='signup'>
              Sign Up
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default Navbar;
