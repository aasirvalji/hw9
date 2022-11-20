import React from "react";
import usePushNotifications from "./usePushNotifications";
import sendNotification from "./push-notifications"

export default function PushNotifications() {
  const {
    userSubscription,
    subscribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    onClickSendNotification,
  } = usePushNotifications();

  // const {sendNotification} = pushNot();

  return (
    <main>

      <button onClick={subscribeToPushNotification}>Create Notification subscription</button>
      <button onClick={onClickSendSubscriptionToPushServer}>Send subscription to push server</button>
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
    </main>
  );
}
