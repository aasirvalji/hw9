import { useState, useEffect } from "react";
import axios from 'axios';
import CONSTS from '../../utils/consts.json';

const BASE_URL = CONSTS.BASE_URL;
const publicVapidKey = "BFhZAN-nNturTa7ptaq5iR5hynPjKn5snJk6ZuSl0dcnURXiebicm6nhg7f-mnYdh5g4HfBbJuTusW6OLQ05mwY";

export default function usePushNotifications() {
  const [userSubscription, setUserSubscription] = useState(null);
  const [register, setRegister] = useState(null);

  useEffect(() => {
    const registerServiceWorker = async () => {
      const reg = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
      });
      setRegister(reg);
    };
    registerServiceWorker();
  }, []);

  useEffect(() => {
    const getExistingSubscription = async () => {
      const worker = await navigator.serviceWorker.ready
      const existingSubscription = await worker.pushManager.getSubscription();

      setUserSubscription(existingSubscription);
    };
    getExistingSubscription();
  }, []);

  const subscribeToPushNotification = async () => {
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    setUserSubscription(subscription);
    return await subscribeToServer(subscription);
  };

  const subscribeToServer = async (sub) => {
    const res = await axios.post(`${BASE_URL}/api/notifications/subscribe`, sub);
    console.log(res.data);
    return;
  };

  const onClickSendNotification = async () => {
    await axios.get(`${BASE_URL}/api/notifications`);
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return {
    subscribeToPushNotification,
    onClickSendNotification,
    userSubscription,
  };
}