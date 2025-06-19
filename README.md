# 🎓 Student Progress Management System

A full-stack MERN application that helps mentors or admins track student progress on Codeforces. The system visualizes contest history and problem-solving activity, supports automatic data syncing, and detects inactivity with email reminders.

---

## ✅ Overview

- **Project Title**: Student Progress Management System  
- **Stack**: MERN (MongoDB, Express, React, Node.js)  
- **Submission Deadline**: 19th June, 11:59 PM  

This platform provides a centralized interface for tracking and analyzing student performance on Codeforces. It features data visualizations, smart syncing, and automated email engagement to promote consistency in competitive programming.

---

## 🌐 Live Demo & Links

- **🎥 Demo Video**: [Watch on YouTube](https://youtu.be/T9QmAkiQn2Y?feature=shared)  
- **🔗 Frontend Repository**: [GitHub - Frontend](https://github.com/Agrahariabhishek22/Codeforces-Student-Management-System-Frontend)  
- **🔗 Backend Repository**: [GitHub - Backend](https://github.com/Agrahariabhishek22/Codeforces-Student-Management-System-Frontend)  
- **📬 Postman API Docs**: [View Postman Documentation](https://documenter.getpostman.com/view/36767454/2sB2x9kr31)

---

## 🛠 Tech Stack

### Frontend:
- React
- Material UI
- Recharts (for rating and bar graphs)
- react-calendar-heatmap (for submission heatmap)
- react-csv (for CSV export)

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- node-cron (for scheduled syncing)
- Nodemailer (for inactivity email notifications)

### External APIs:
- Codeforces Public APIs

---

## 🚀 Features

### 1. 📋 Student Table View
- View all students with their basic details:
  - Name, Email, Phone, CF Handle, Current Rating, Max Rating
- Actions:
  - Add / Edit / Delete students
  - Export student data as CSV
  - Click to view full student profile

---

### 2. 👤 Student Profile View

#### A. Contest History
- Filter by: Last 30 / 90 / 365 days
- Displays:
  - Line graph showing rating trend
  - Contest rank, rating change, and unsolved problems count

#### B. Problem Solving Data
- Filter by: Last 7 / 30 / 90 days
- Shows:
  - Most difficult problem solved (by rating)
  - Total solved, average problems/day, average rating
  - Bar chart (problems solved by rating bucket)
  - Submission heatmap (calendar-style)

---

### 3. 🔁 Codeforces Data Sync
- Automated daily sync at **2 AM** using `node-cron`
- Instantly re-syncs when a student's Codeforces handle is updated
- Avoids real-time API calls during active user hours

---

### 4. 📧 Inactivity Detection + Email
- Identifies students inactive for 7+ days
- Sends automated emails using **Nodemailer**
- Tracks how many reminders have been sent
- Option to disable auto-mail per student

---

## 🎨 Bonus Features
- Fully responsive (mobile, tablet, desktop)
- Light and Dark mode toggle

---

## 🏁 How to Run Locally

### ⚙️ Backend Setup
```bash
git clone <backend-repo-url>
cd backend
npm install
npm run dev
