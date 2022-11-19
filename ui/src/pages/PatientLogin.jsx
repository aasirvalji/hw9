import React, { useContext, useEffect, useState } from 'react';
import { AlanContext } from '../AlanContext';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import CONSTS from '../utils/consts.json';
import axios from 'axios';

const { BASE_URL } = CONSTS;

function PatientLogin() {
  const { checkAlanVisibility, ready } = useContext(AlanContext);
  const { getAuth, setData, setLoading } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (ready) checkAlanVisibility(window.location.pathname);
  }, [checkAlanVisibility, ready]);

  async function onSubmit() {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
        'type',
        window.location.pathname.split('-')[0].substring(1)
      );

      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/auth`, {
        headers: { authorization: `Bearer ${localStorage.token}` },
      });
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setData(null);
      setLoading(false);
    }
  }

  if (getAuth()) {
    //if logged in
    return <Navigate to='/home' />;
  }

  return (
    <>
      <div className='login-container'>
        <div className='login-content-container'>
          <p className='login-text gradient-text'>Login</p>
          <p className='login-subtext'>
            {' '}
            Don't have an account?<Link to='/register'> Register</Link>
          </p>
          <div className='login-input-content'>
            <div className='login-input-username'>
              <p>Username</p>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='login-input-password'>
              <p>Password</p>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className='login-button' onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default PatientLogin;
