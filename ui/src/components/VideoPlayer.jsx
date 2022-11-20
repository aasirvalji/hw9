import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div className='video-streams-container'>
      {stream && (
        <div id='you-player'>
          <p>You: </p>
          <video playsInline muted ref={myVideo} autoPlay />
        </div>
      )}
      {callAccepted && !callEnded && (
        <div id='other-player'>
          <p>Attendee: </p>
          <video playsInline ref={userVideo} autoPlay />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
