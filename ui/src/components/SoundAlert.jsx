import React, { useState } from 'react';
import { useEffect } from 'react';

// Import your audio file
import song from '../assets/alert_trim.mp3';

function SoundAlert({ setShowAlert, name }) {
  const [audio, setAudio] = useState(new Audio(song));
  const [playing, setPlaying] = useState(false);

  // Main function to handle both play and pause operations

  useEffect(() => {
    // function playPause() {
    //   if (playing) audio.pause();
    //   else audio.play();
    //   setPlaying(!playing);
    // }
    // playPause();
    audio.play();
  }, []);

  return (
    <div id='myModal' class='modal'>
      <div class='modal-content'>
        <span class='close' onClick={() => setShowAlert(false)}>
          &times;
        </span>
        <p>
          <span className='gradient-text'>
            Hey{' ' + name || ''}, its time to take your medication
          </span>
        </p>
      </div>
    </div>
    // <div>
    //   {/* Show state of song on website */}
    //   <p>{playing ? 'Song is Playing' : 'Song is Paused'}</p>

    //   {/* Button to call our main function */}
    //   <button onClick={() => playPause()}>Play | Pause</button>
    // </div>
  );
}

export default SoundAlert;
