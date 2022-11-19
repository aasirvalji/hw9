import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import CONSTS from '../utils/consts.json';
import { UserContext } from '../UserContext';
import { AlanContext } from '../AlanContext';

const { BASE_URL } = CONSTS;
var userType = window.location.pathname.split('-')[0].substring(1);

function PatientRegister() {
  const { checkAlanVisibility, ready } = useContext(AlanContext);
  const { data, setData, loading, setLoading, getAuth } =
    useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (ready) checkAlanVisibility(window.location.pathname);
  }, [checkAlanVisibility, ready]);

  async function onSubmit() {
    // authenticate user and get token from server
    if (password !== confirmPassword)
      return alert(
        'Password does not match confirm password. Please try again.'
      );
    console.log(username, password, confirmPassword);
    const res = await axios.post(`${BASE_URL}/api/auth/register`, {
      username,
      password,
      type: userType,
    });

    localStorage.setItem('token', res.data.token);
  }

  if (getAuth()) {
    //if logged in
    return <Navigate to='/home' />;
  }

  return (
    <>
      <div className='register-container'>
        <div className='register-content-container'>
          <p className='register-text gradient-text'>Register</p>
          <p className='register-subtext'>
            {' '}
            Already have an account?<Link to='/login'> Login</Link>
          </p>
          <div className='register-input-content'>
            <div className='register-input-username'>
              <p>Username</p>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='register-input-password'>
              <p>Password</p>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='register-input-confirm-password'>
              <p>Confirm password</p>
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button className='register-button' onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default PatientRegister;
