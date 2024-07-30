import React, { useState } from 'react';
import axios from 'axios';
import WebcamCapture from './WebcamCapture';
import BackButton from './BackButton';

const RegisterUser = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    if (!imageSrc) {
      alert('Please capture an image first.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/register_new_user/', { username, image: imageSrc });
      alert(response.data.message);
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        alert('Registration failed: ' + error.response.data.detail);
      } else {
        alert('Registration failed: An unknown error occurred.');
      }
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Register New User</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <BackButton />
        <button className="btn btn-primary" onClick={handleRegister}>Register</button>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Input Username"
        />
      </div>
      <div className="mb-3">
        <WebcamCapture setImageSrc={setImageSrc} />
      </div>
    </div>
  );
};

export default RegisterUser;
