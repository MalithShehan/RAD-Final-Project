RAD Final Project
This repository contains the source code for the RAD Final Project, a full-stack application designed to serve as a library management system. The project was developed as part of the Mobile Application Developer course requirements.

Table of Contents
Project Overview
Features
Technologies Used
Installation
Usage
API Documentation
Contributing
License
Project Overview
The RAD Final Project is a library management system built using modern development tools. The system allows users to manage library operations, including book inventory, user accounts, and lending/returning of books.

The application is developed as a mobile-first application using React Native for the frontend and Node.js for the backend, providing seamless and responsive functionality across devices.

Features
User authentication with JWT-based security.
State management for efficient data handling.
CRUD operations for:
Books
Users
Borrow/Return Records
Real-time data updates with RESTful API integration.
Intuitive and user-friendly navigation.
Role-based access controls for administrators and users.
Technologies Used
Frontend
React Native with TypeScript
State Management: Context API/Redux
UI Framework: Native Base/React Native Paper
Backend
Node.js with Express.js
Database: MySQL (via Prisma ORM)
Authentication: JWT
ORM: Prisma
Installation
Prerequisites
Node.js
npm or yarn
MySQL database
React Native development environment (Expo or CLI)
Steps
Clone the repository:
bash
Copy
Edit
git clone https://github.com/MalithShehan/RAD-Final-Project.git
Navigate to the project directory:
bash
Copy
Edit
cd RAD-Final-Project
Install dependencies for both frontend and backend:
bash
Copy
Edit
cd frontend
npm install
cd ../backend
npm install
Set up the database:
Create a MySQL database.
Configure the database connection in the .env file in the backend folder.
Run Prisma migrations:
bash
Copy
Edit
npx prisma migrate dev
Start the backend server:
bash
Copy
Edit
cd backend
npm start
Start the frontend application:
bash
Copy
Edit
cd frontend
npm start
Usage
Open the application in your preferred React Native emulator or on a physical device.
Register as a new user or log in with an existing account.
Navigate through the app to explore features such as managing books, users, and borrow/return records.
API Documentation
For detailed API documentation, refer to the API Documentation file.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch:
bash
Copy
Edit
git checkout -b feature-name
Commit your changes:
bash
Copy
Edit
git commit -m "Description of changes"
Push to the branch:
bash
Copy
Edit
git push origin feature-name
Open a pull request.
License
This project is licensed under the MIT License.
