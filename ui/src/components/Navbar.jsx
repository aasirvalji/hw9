import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import doctor from '../assets/doctor.png';

function Navbar() {
  const [auth, setAuth] = useState(false);
  const { data, loading, getAuth } = useContext(UserContext);

  useEffect(() => {
    setAuth(getAuth());
  }, [data, loading, getAuth, setAuth]);

  return (
    <nav class='navbar'>
      <div class='navbar__container'>
        <Link to='home' id='navbar__logo'>
          <img src={doctor} alt='doctor' />
        </Link>
        <div class='navbar__toggle' id='mobile-menu'>
          <span class='bar'></span> <span class='bar'></span>
          <span class='bar'></span>
        </div>

        {!auth ? (
          <ul class='navbar__menu'>
            <li class='navbar__item'>
              <Link to='/patient-register' className='navbar__links'>
                Register
              </Link>
            </li>
            <li class='navbar__btn'>
              <Link to='/patient-login' className='button'>
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <ul class='navbar__menu'>
            <li class='navbar__item'>
              <Link to='/pills' className='navbar__links'>
                Pills
              </Link>
            </li>
            <li class='navbar__item'>
              <Link to='/notifications' className='navbar__links'>
                Notifications
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
