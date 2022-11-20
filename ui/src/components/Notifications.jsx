import React, { useContext } from 'react';

import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div id='call-start-prompt'>
          <p>
            You have an incoming call from an {''}
            <span className='gradient-text'>attendee</span>
          </p>
          <button type='button' className='button' onClick={answerCall}>
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;
