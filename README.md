# Pewple-App 📱  
**Pewple — A social media platform to connect people, share thoughts, and build community.**

[Live Demo → pewple-app.web.app](https://pewple-app.web.app)

---

## Table of Contents  
- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation & Setup](#installation--setup)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Future Roadmap](#future-roadmap)  
- [Contributing](#contributing)  
- [License](#license)  
- [Credits](#credits)  

---

## About  
Pewple-App is our first ever social media application designed to let users create an account, post updates, interact with others — similar in spirit to Facebook but built as a clean, modern, and lightweight alternative.  

We built Pewple to explore full-stack development using modern web technologies, sharpen our skills in frontend (React) and backend (Firebase), and create a project that demonstrates end-to-end app development — from UI to authentication and real-time data.  

---

## Features  
- User authentication (sign-up / sign-in / sign-out)  
- User profiles  
- Post creation and feed (text, images, etc.)  
- Real-time updates / data syncing via Firebase  
- Responsive UI for desktop & mobile (if applicable)  
- (Optional) future: comments, likes, friend/connection system, notifications  

---

## Tech Stack  
- Frontend: React (create-react-app) + JavaScript / CSS / HTML  
- Backend / Database / Auth / Hosting: Firebase  
- Deployment: Firebase Hosting  

---

## Getting Started  

### Prerequisites  
- Node.js (v14+ recommended) & npm or Yarn  
- A Firebase project (for auth / database / hosting)  

### Installation & Setup  
```bash
# Clone repository  
git clone https://github.com/Pewple-Group/Pewple-App.git  
cd Pewple-App  

# Install dependencies  
npm install  
# or  
yarn install  

# Configure Firebase  
# 1. Create a Firebase project (if not already)  
# 2. Copy your Firebase config keys into a file like `.env.local` or update the config in `src/firebase.js` (or wherever applicable)  

# Run locally  
npm start  
# or  
yarn start  

# Build & Deploy (for production)  
npm run build  
# then deploy via Firebase CLI if configured  
# e.g. firebase deploy




