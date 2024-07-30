import React, { useState } from 'react';
import axios from 'axios';
import WebcamCapture from './WebcamCapture';
import BackButton from './BackButton';

const Login = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleLogin = async () => {
    if (!imageSrc) {
      alert('Please capture an image first.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', { image: imageSrc });
      alert(response.data.message);
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.error('Error response:', error.response);
        alert('Login failed: ' + error.response.data.detail);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Login failed: No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        alert('Login failed: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Login</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <BackButton />
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div className="mb-3">
        <WebcamCapture setImageSrc={setImageSrc} />
      </div>
    </div>
  );
};

export default Login;
