import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { SocketContext } from '../SocketContext';

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <form>
      {callAccepted && !callEnded ? (
        <button
          type='button'
          className='button'
          width={500}
          onClick={leaveCall}
        >
          Hang Up
        </button>
      ) : (
        <CopyToClipboard text={`http://localhost:5000/${me}`}>
          <button className='button'>
            Copy your meeting invite: <i class='fa-solid fa-clipboard'></i>
          </button>
        </CopyToClipboard>
        // <button
        //   type='button'
        //   className='button'
        //   width={500}
        //   onClick={() => callUser(idToCall)}
        // >
        //   Call
        // </button>
      )}
      {children}
    </form>
  );
};

export default Sidebar;
