import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import RegisterUser from './components/RegisterUser';
import Logs from './components/Logs';
import Pic from './components/Pic';

const HomeButtons = () => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <Link to="/login">
        <button className="btn btn-primary mx-2">Login</button>
      </Link>
      <Link to="/logout">
        <button className="btn btn-primary mx-2">Logout</button>
      </Link>
      <Link to="/register">
        <button className="btn btn-primary mx-2">Register</button>
      </Link>
      <Link to="/logs">
        <button className="btn btn-primary mx-2">Logs</button>
      </Link>
    </div>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <div className="container">
      <header className="text-center mb-4">
        <h1 className="display-4">Face Recognition Attendance System</h1>
        <p>
          To use this face recognition system, you must already be registered. If not, please register yourself by clicking the "register" button.
          If you are registered, you may login or logout as you wish. Attendance logs can be downloaded by clicking the "logs" button.
        </p>
      </header>
      {location.pathname === '/' && (
        <>
          <HomeButtons />
          <Pic />
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </div>
  );
};

const MainApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MainApp;
