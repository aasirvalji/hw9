import React, { useEffect, useState, useContext } from 'react';
import CONSTS from '../utils/consts.json';
import axios from 'axios';
import Loader from '../components/Loader';
import Upload from '../components/Upload';
import { AlanContext } from '../AlanContext';

const BASE_URL = CONSTS.BASE_URL;

function Pills() {
  const { alanBtnRef } = useContext(AlanContext);

  const [loading, setLoading] = useState(false);
  const [pills, setPills] = useState(null);

  useEffect(() => {
    const getPills = async () => {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/pills`);
      setLoading(false);
      console.log(res.data);
      setPills(res.data.pills);
    };
    getPills();
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-pills'>
        {loading || !Array.isArray(pills) ? (
          <Loader />
        ) : (
          pills.reverse().map((pill, idx) => {
            return (
              <div
                className={
                  pills && pills.length > 1
                    ? 'dashboard-pill-item mb-custom'
                    : 'dashboard-pill-item'
                }
                key={idx}
              >
                <div className='dashboard-pill-item-header'>
                  <p className='dashboard-pill-item-title'>{pill.title}</p>
                  <p className='dashboard-pill-item-date'>
                    Uploaded: {new Date(pill.created).toLocaleString()}
                  </p>
                </div>
                <div className='dashboard-pill-item-content'>
                  <a href={pill.url} target='_blank' rel='noopener noreferrer'>
                    <img
                      className='dashboard-pill-item-image'
                      src={pill.url}
                      alt='pill'
                    />
                  </a>
                  {pill.longtext && (
                    <p className='dashboard-pill-item-text'>{pill.longtext}</p>
                  )}
                  <button
                    onClick={() =>
                      alanBtnRef.btnInstance.playText('big boy daddy')
                    }
                  >
                    test
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Upload />
    </div>
  );
}

export default Pills;
