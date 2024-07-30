import React from 'react';
import './Pic.css'; // Import the CSS file

const Pic = () => {
  return (
    <div className="image-container">
      <img className="resized-image" src="/images/face_recog.webp" alt="Welcome!" />
    </div>
  );
};

export default Pic;