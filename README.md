# MERN-PROJECT

This project is a MERN stack application which includes a backend built with Node.js, Express, and MongoDB, and a frontend built with React and Redux.

## Prerequisites

Make sure you have the following installed on your local development machine:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1 or higher)
- MongoDB (you can use MongoDB Atlas for a cloud-based solution)

## Installation

### Backend Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HilinaMulugeta/MERN-PROJECT.git
   cd your-repo-name/backend
Install dependencies:
npm install
Set up environment variables:
Create a .env file in the backend directory and add your MongoDB URI and any other required environment variables:

touch .env
Inside .env file:
# put the following code
MONGODB_URI=your_mongodb_uri
PORT=3001
Run the backend server:

bash
Copy code
npm start
The backend server should now be running on http://localhost:3001.

Frontend Installation
Navigate to the frontend directory:

cd ../frontend
Install dependencies:

npm install
Set up environment variables:

Create a .env file in the frontend directory and add any required environment variables. For example, the API base URL:
touch .env
Inside .env file put the follwing code

REACT_APP_API_BASE_URL=http://localhost:3001
Run the frontend server:

npm start
The frontend server should now be running on http://localhost:3000.

Additional Setup
Setting Up Redux
Install Redux and React-Redux:

npm install @reduxjs/toolkit react-redux redux-saga
Setting Up SASS
Install SASS:

npm install sass
Running the Application
Start the backend server:

cd backend
npm start
Start the frontend server:

Open a new terminal and run:

cd frontend
npm start
You should now have both the backend and frontend servers running. Navigate to http://localhost:3000 to view the application.

Troubleshooting
Common Issues
MongoDB Connection Error: Ensure your MongoDB URI is correct and your IP is whitelisted if you're using MongoDB Atlas.
Port Conflicts: Make sure the ports 3000 (frontend) and 3001 (backend) are not being used by other applications.
Environment Variables: Double-check your .env files to ensure all necessary environment variables are set correctly.
