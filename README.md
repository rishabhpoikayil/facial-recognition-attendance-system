# Facial Recognition Attendance System

## Project Overview

The Facial Recognition Attendance System is a web application designed to manage user attendance using facial recognition technology. It provides functionalities for user registration, login, and logout based on face recognition. The application is split into a backend and frontend, with the backend handling the face recognition logic and data storage, while the frontend provides the user interface.

## Technologies Used

- **Backend**:
  - **FastAPI**: Web framework for building the API.
  - **Python**: Programming language for backend logic.
  - **face-recognition**: Library for facial recognition.
  - **Uvicorn**: ASGI server for running the FastAPI application.
  - **Git**: Version control system.

- **Frontend**:
  - **React**: JavaScript library for building user interfaces.
  - **Bootstrap**: CSS framework for styling.
  - **JavaScript**: Programming language for frontend logic.
  - **npm**: Package manager for managing frontend dependencies.

## Project Structure

- **backend/**: Contains the FastAPI backend code.
  - `main.py`: Main entry point for the backend application.
  - `requirements.txt`: Dependencies for the backend.

- **frontend/**: Contains the React frontend code.
  - **public/**: Static assets and HTML file.
  - **src/**: React components and application logic.
  - `package.json` & `package-lock.json`: Dependencies and scripts for the frontend.


## Running Locally

Before following the instructions below, make sure to open two separate terminals: one for the backend and one for the frontend.

### Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend

2. **Install dependencies for the backend code**:
   ```bash
   pip install -r requirements.txt

3. **Run the FastAPI server**:
   ```bash
   uvicorn main:app --reload

### Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend

2. **Install dependencies for the frontend code**:
   ```bash
   npm install

3. **Run the React development server**:
   ```bash
   npm start

The frontend will be available at `http://localhost:3000`.
