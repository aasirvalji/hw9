import React, { useState, useEffect, useContext } from 'react';
import usePushNotifications from './usePushNotifications';
import sendNotification from './push-notifications';
import axios from 'axios';
import { AlanContext } from '../../AlanContext';
import CONSTS from '../../utils/consts.json';
import SoundAlert from '../../components/SoundAlert';
const BASE_URL = CONSTS.BASE_URL;

export default function PushNotifications() {
  const {
    userSubscription,
    subscribeToPushNotification,
    onClickSendNotification,
  } = usePushNotifications();

  const { pillsTaken, setPillsTaken, alanBtnRef, takenPill, setTakenPill } =
    useContext(AlanContext);

  const [isNotified, setNotified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPills, setCurrentPills] = useState(null);
  const [prevPills, setPrevPills] = useState(null);
  const [name, setName] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    const getExisting = async () => {
      const worker = await navigator.serviceWorker.ready;
      const existingSubscription = await worker.pushManager.getSubscription();
      if (existingSubscription) setNotified(true);
    };
    getExisting();
  });

  const push = async () => {
    const res = await subscribeToPushNotification();
    setNotified(true);
  };

  useEffect(() => {
    // get name, last two prescriptions and rand pills, add alan ai integration, text push noti here
    const getCurrentMedication = async () => {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/notifications/medicine`);
      setLoading(false);
      console.log(res.data);
      setCurrentPills(res.data.pills[0]);
      setPrevPills(res.data.pills[1]);
      setName(res.data.name);
    };
    getCurrentMedication();
  }, []);

  useEffect(() => {
    if (pillsTaken) {
      // read current medication details
      alanBtnRef.btnInstance.playText(
        `Hey ${name}, You've still need to take some pills today. The last pill you took was ${currentPills.prev} minutes ago. You have to take your next pill in ${currentPills.next} minutes`
      );
    }
  }, [pillsTaken, setPillsTaken, alanBtnRef.btnInstance]);

  useEffect(() => {
    if (takenPill) {
      alanBtnRef.btnInstance.playText(
        `That's nice to hear ${name}, thanks for letting me know`
      );
    }
  }, [takenPill, setTakenPill, alanBtnRef.btnInstance]);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(true);
    }, 2000);
  }, []);

  // ask alan ai when next time is, how many taken so far, if i still needto take any, read text stuff from screen, demo with api call here

  return (
    <div className='notifications-container'>
      <div className='notif-header-buttons'>
        <button disabled={isNotified} className='button' onClick={push}>
          <i class='fa-solid fa-bell'></i>
        </button>
        <button onClick={onClickSendNotification} className='button'>
          <i class='fa-solid fa-paper-plane'></i>
        </button>
      </div>

      <div className='medication-container'>
        {currentPills && (
          <div className='upcoming-medication'>
            <p className='upcoming-medication-header gradient-text'>
              Primary medication:{' '}
            </p>
            <img src={currentPills.url} alt='current-pills' />
            <p>In: {currentPills.next} minute(s)</p>
            <p>Last time taken: {currentPills.prev} minute(s) ago</p>
          </div>
        )}
        {prevPills && (
          <div className='past-medication'>
            <p className='upcoming-medication-header gradient-text'>
              Secondary medication:{' '}
            </p>
            <img src={prevPills.url} alt='current-pills' />
            <p>Last taken: {prevPills.prev} hour(s) ago</p>
            <p>Next in: {prevPills.next} hour(s)</p>
          </div>
        )}
      </div>

      {/* <div>
        <button onClick={sendNotification}>test notif</button>
      </div> */}
      {/* 
      <section>
        <h4>Your notification subscription details</h4>
        <pre>
          <code>{JSON.stringify(userSubscription, null, ' ')}</code>
        </pre>
      </section> */}
      {showAlert && <SoundAlert setShowAlert={setShowAlert} name={name} />}
    </div>
  );
}
