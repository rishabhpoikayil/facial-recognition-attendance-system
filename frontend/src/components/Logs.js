import React from 'react';
import axios from 'axios';
import BackButton from './BackButton';

const Logs = () => {
  const handleDownloadLogs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/logs/', {
        responseType: 'blob', // Important for handling binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_logs.zip'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download logs:', error);
      alert('Failed to download logs.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Attendance Logs</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <BackButton />
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleDownloadLogs}>Download Logs</button>
        </div>
      </div>
    </div>
  );
};

export default Logs;
