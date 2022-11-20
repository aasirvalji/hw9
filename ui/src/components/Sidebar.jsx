import React, { useState, useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { SocketContext } from '../SocketContext';

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  useEffect(() => {
    const search = window.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    setIdToCall(params.get('call') ? params.get('call') : '');
    if (idToCall) callUser(idToCall);
  }, [callUser, idToCall]);

  return (
    <div className='sidebar-buttons'>
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
        <CopyToClipboard text={`http://localhost:3000/appointment?call=${me}`}>
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
    </div>
  );
};

export default Sidebar;
