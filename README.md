# Blogging Platform Assignment

A full-stack blogging platform assignment built with React, Node.js, and Express.

## Project Structure

The project is divided into two main directories:
- `/frontend` - React application
- `/backend` - Node.js/Express server

## Prerequisites

- Node.js
- npm (comes with Node.js)

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:8080`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:5173`

## Running the Application

1. Start the backend server first (from the backend directory):
```bash
npm start
```

2. In a new terminal, start the frontend development server (from the frontend directory):
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Assignment Features

- User authentication (signup/login)
- Create, read, update, and delete blog posts
- View post details
- Responsive design

## Assignment Limitations
- Comment functionality was not implemented due to time constraints

## Future Enhancements (Given More Time)
- Implement comment functionality with nested replies
- Add rich text editor for blog posts
- Implement user profile pages with avatar upload
- Implement search functionality
- Add pagination for posts
- Add filtering options on post listing
- Add reaction system (like, love, helpful) on posts
- Add dark/light theme toggle
- Implement post scheduling
- Add image upload support for posts
- Add post preview before publishing
- Implement post sharing via link


## Tech Stack

### Frontend
- React
- Redux Toolkit
- Material-UI
- React Router
- Axios
- date-fns

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt