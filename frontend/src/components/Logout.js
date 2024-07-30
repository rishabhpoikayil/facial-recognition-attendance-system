import React, { useState } from 'react';
import axios from 'axios';
import WebcamCapture from './WebcamCapture';
import BackButton from './BackButton';

const Logout = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleLogout = async () => {
    if (!imageSrc) {
      alert('Please capture an image first.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/logout/', { image: imageSrc });
      alert(response.data.message);
    } catch (error) {
      console.error('Logout failed:', error);
      if (error.response) {
        alert('Logout failed: ' + error.response.data.detail);
      } else {
        alert('Logout failed: An unknown error occurred.');
      }
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Logout</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <BackButton />
        </div>
        <div>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="mb-3">
        <WebcamCapture setImageSrc={setImageSrc} />
      </div>
    </div>
  );
};

export default Logout;
