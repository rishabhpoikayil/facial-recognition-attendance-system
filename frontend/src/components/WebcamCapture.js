import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ setImageSrc }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef, setImageSrc]);

  return (
    <div className="text-center mb-3">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpg"
        width={665}
        height={500}
        className="border border-secondary rounded" // Optional styling
      />
      <div className="mt-3">
        <button className="btn btn-primary" onClick={capture}>Capture Photo</button>
      </div>
    </div>
  );
};

export default WebcamCapture;
