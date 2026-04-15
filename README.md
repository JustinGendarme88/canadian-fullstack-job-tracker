# Job Application Tracker

A full-stack web application to track job applications, built with
React, Node.js, Express, and SQLite.

Live Demo: https://canadian-fullstack-job-tracker.vercel.app\
GitHub Repository:
https://github.com/JustinGendarme88/canadian-fullstack-job-tracker

------------------------------------------------------------------------

## Features

-   Add job applications
-   View all applications
-   Update application status (Applied, Interview, etc.)
-   Delete applications
-   Filter applications by status
-   Responsive and clean UI

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React (Vite)
-   JavaScript (ES6+)
-   CSS

### Backend

-   Node.js
-   Express

### Database

-   SQLite

### Deployment

-   Frontend: Vercel
-   Backend: Render

------------------------------------------------------------------------

## Project Structure

canadian-fullstack-job-tracker/ │ ├── backend/ │ ├── index.js │ ├──
db.js │ └── package.json │ ├── frontend/ │ ├── src/ │ ├── package.json │
└── index.html │ └── README.md

------------------------------------------------------------------------

## Installation & Setup

### 1. Clone the repository

git clone
https://github.com/JustinGendarme88/canadian-fullstack-job-tracker.git
cd canadian-fullstack-job-tracker

### 2. Setup Backend

cd backend npm install npm run dev

### 3. Setup Frontend

cd frontend npm install npm run dev

------------------------------------------------------------------------

## API Endpoints

GET /api/jobs\
POST /api/jobs\
PUT /api/jobs/:id\
DELETE /api/jobs/:id

------------------------------------------------------------------------

## Key Learnings

-   Building a full-stack application from scratch
-   Connecting frontend and backend via REST API
-   Managing state in React
-   Handling CRUD operations with a database
-   Deploying a full-stack app (Vercel + Render)

------------------------------------------------------------------------

## Notes

-   Backend may be slow on first request (Render free tier)
-   SQLite database is not persistent in free hosting

------------------------------------------------------------------------

## Author

Justin Gendarme\
Full Stack Developer (Junior)

------------------------------------------------------------------------

## Future Improvements

-   Edit job details
-   Authentication
-   Persistent database
-   Improved UI/UX
