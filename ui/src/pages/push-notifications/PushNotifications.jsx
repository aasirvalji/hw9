import React, { useState, useEffect } from "react";
import usePushNotifications from "./usePushNotifications";
import sendNotification from "./push-notifications"

export default function PushNotifications() {

  const {
    userSubscription,
    subscribeToPushNotification,
    onClickSendNotification,
  } = usePushNotifications();

  const [isNotified, setNotified] = useState(false);

  useEffect(() => {
    const getExisting = async () => {
      const worker = await navigator.serviceWorker.ready
      const existingSubscription = await worker.pushManager.getSubscription();
      if (existingSubscription) setNotified(true);
    };
    getExisting();
  })

  const push = async () => {
    const res = await subscribeToPushNotification();
    setNotified(true);
  }

  return (
    <div style={{ marginLeft: "50px", marginTop: "50px", position: "relative", display: "block" }}>

      <button disabled={isNotified} onClick={push}>Get Notified 🔔</button>
      <div>
        <button onClick={onClickSendNotification}>Send a notification</button>
      </div>

      <div>
        <button onClick={sendNotification}>test notif</button>
      </div>

      <section>
        <h4>Your notification subscription details</h4>
        <pre>
          <code>{JSON.stringify(userSubscription, null, " ")}</code>
        </pre>
      </section>
    </div>
  );
}
