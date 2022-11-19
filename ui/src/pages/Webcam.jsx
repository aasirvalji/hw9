import { useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

var imageSavePrefix = 'Your image has been saved with the name ';
var imageSaveSuffix = ' in your Downloads directory';

const WebcamCapture = () => {
  const [show, setShow] = useState(false);
  const [filename, setFilename] = useState('');

  function downloadBase64File(contentType, base64Data, fileName) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    setFilename(fileName);
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 3000);
  }

  return (
    <>
      <div className='webcam-wrapper'>
        <Webcam
          audio={false}
          screenshotFormat='image/png'
          id='webcam'
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <button
              className='button'
              onClick={() => {
                const imageSrc = getScreenshot();
                downloadBase64File(
                  'png',
                  imageSrc.split(',')[1],
                  String(Date.now()) + '.png'
                );
              }}
            >
              <i class='fa-solid fa-camera'></i>
            </button>
          )}
        </Webcam>
      </div>

      {show && (
        <div id='myModal' class='modal'>
          <div class='modal-content'>
            {/* <span class='close'>&times;</span> */}
            <p>
              {imageSavePrefix}
              <span className='gradient-text'>{filename}</span>
              {imageSaveSuffix}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WebcamCapture;
