import React, { useState, useRef } from 'react';
import axios from 'axios';
import Loader from './Loader';

const bucketRoot = 'https://file-cli-9999.s3.amazonaws.com';
const baseUrl = 'http://localhost:5000';

function Upload() {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    setLoading(true);
    var r = await axios.post(`${baseUrl}/api/pills/create`, {});
    var title = r.data.title;

    let file = inputRef.current.files[0];
    let fileParts = inputRef.current.files[0].name.split('.');
    let fileType = fileParts[1];

    if (!file || !fileParts) return alert('Please upload a file.');

    var res = await axios.post(`${baseUrl}/api/aws`, {
      fileName: title,
      fileType,
    });

    var returnData = res.data.data.returnData;

    // Get signed request and URL from backend
    var signedRequest = returnData.signedRequest;
    var url = returnData.url;
    console.log('Recieved a signed request ' + signedRequest);
    console.log('Recieved a write URL @' + url);

    // Put the fileType in the headers for the upload
    var options = {
      headers: {
        'Content-Type': fileType,
      },
    };

    delete axios.defaults.headers.authorization;
    axios
      .put(signedRequest, file, options)
      .then((result) => {
        console.log('Success: ' + result);
        axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(
          'token'
        )}`;

        // set completion request to db here

        setLoading(false);
      })
      .catch((error) => {
        alert('ERROR ' + JSON.stringify(error));
      });
  }

  return (
    <div className='dashboard-add-receipt'>
      <p className='gradient-text'>Wanna add a new receipt?</p>
      {/* <div className='upload-name-container'>
        <p>Name: </p>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div> */}

      <label className='custom-file-upload'>
        <input
          ref={(ref) => {
            inputRef.current = ref;
          }}
          type='file'
        />
        Select file
      </label>
      <br />
      {loading ? (
        <Loader />
      ) : (
        <button className='upload-button' onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
}

export default Upload;
