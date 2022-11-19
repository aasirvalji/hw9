import React, { useState, useRef } from 'react';
import axios from 'axios';
import Loader from './Loader';

const bucketRoot = 'https://file-cli-9999.s3.amazonaws.com';
const baseUrl = 'http://localhost:5000';

function Upload({ setPills, pills }) {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    setLoading(true);
    let file = inputRef.current.files[0];
    if (!file) {
      alert('Please upload a file.');
      return setLoading(false);
    }

    let fileParts = inputRef.current.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    var res = await axios.post(`${baseUrl}/api/aws`, {
      fileName,
      fileType,
    });

    var returnData = res.data.data.returnData;

    // Get signed request and URL from backend
    var signedRequest = returnData.signedRequest;
    var url = returnData.url;

    res = await axios.post(`${baseUrl}/api/pills/create`, { url });
    var id = res.data.id;

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
      .then(async (result) => {
        console.log('Success: ' + result);
        axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(
          'token'
        )}`;

        // set completion request to db here
        res = await axios.post(`${baseUrl}/api/pills/create/${id}`);
        setPills((prev) => [res.data, ...prev]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className='dashboard-add-pill'>
      <p className='gradient-text'>Wanna order new medication?</p>
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
        <button className='upload-button button' onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
}

export default Upload;
