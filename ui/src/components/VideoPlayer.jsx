import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <>
      {stream && (
        <>
          {/* {name || 'You'} */}
          <video playsInline muted ref={myVideo} autoPlay />
        </>
      )}
      {callAccepted && !callEnded && (
        <>
          {/* <p>{call.name || 'Other'}</p> */}
          <video playsInline ref={userVideo} autoPlay />
        </>
      )}
    </>
  );
};

export default VideoPlayer;
