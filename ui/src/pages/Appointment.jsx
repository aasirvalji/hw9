import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';
import { ContextProvider } from '../SocketContext';

function Appointment() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <ContextProvider>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </ContextProvider>
    </>
  );
}

export default Appointment;
