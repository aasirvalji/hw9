import React, { useEffect, useState, useContext } from 'react';
import CONSTS from '../utils/consts.json';
import axios from 'axios';
import Loader from '../components/Loader';
import Upload from '../components/Upload';
import { Link } from 'react-router-dom';
import { AlanContext } from '../AlanContext';
import nums from '../utils/nums.json';
import "../styles/pills.css";

const BASE_URL = CONSTS.BASE_URL;

function Pills() {
  const { alanBtnRef, pillData, setPillData, readPills, setReadPills } =
    useContext(AlanContext);

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

  useEffect(() => {
    if (pillData && pillData >= 1 && pillData < pills.length) {
      var pillIndex = pillData - 1;
      // may need window refresh due to alan state
      alanBtnRef.btnInstance.playText(`Reading pill ${pillData}`);
      alanBtnRef.btnInstance.playText(
        `The prescription is: ${pills[pillIndex].longtext}`
      );
    }
  }, [pillData, setPillData, alanBtnRef.btnInstance, pills]);

  useEffect(() => {
    if (readPills === true) {
      for (var i = 0; i < pills.length; i++) {
        var { longtext } = pills[i];
        alanBtnRef.btnInstance.playText(`Reading pill ${i + 1}`);
        alanBtnRef.btnInstance.playText(`The prescription is: ${longtext}`);
        if (i === pills.length - 1) {
          alanBtnRef.btnInstance.playText(
            `Stopping reading, no more pills to read.`
          );
        }
      }
    }
  }, [readPills, setReadPills, alanBtnRef.btnInstance]);

  return (
    <div className='background'>
      <div className='dashboard-container'>
        <div className='dashboard-pills'>
          {loading || !Array.isArray(pills) ? (
            <Loader />
          ) : (
            pills.map((pill, idx) => {
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
                    <div className='dashboard-pill-item-description'>
                      <div className='dashboard-pill-item-inner'>
                        <p>Title: keywords</p>
                        {pill.longtext && (
                          <p className='dashboard-pill-item-text'>
                            {pill.longtext.substring(0, 250)}
                          </p>
                        )}
                      </div>

                      <div className='dashboard-pill-item-buttons'>
                        {/* <button
                        className='button'
                        onClick={() =>
                          alanBtnRef.btnInstance.playText('big boy daddy')
                        }
                      >
                        <i class='fa-solid fa-play'></i>
                      </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className='pills-sidebar'>
          <Upload setPills={setPills} />
          <div className='webcam-prompt-dashboard'>
            <p className='gradient-text'>Dont have any pictures yet?</p>
            <br />
            <Link to='/webcam'>
              <button className='webcam-prompt-button button'>
                <i class='fa-solid fa-camera'></i>
              </button>
            </Link>
          </div>
          <div className='webcam-meeting-invite'>
            <p className='gradient-text'>
              Want to get in touch with your doctor?
            </p>
            <br />
            <Link to='/appointment' target='_blank' rel='noopener noreferrer'>
              <button className='webcam-prompt-button button'>
                <i class='fa-solid fa-video'></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pills;
