# 🎓 EduPath - Smart Education & Career Counseling Platform

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow.svg?logo=javascript)](https://developer.mozilla.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

EduPath is an educational web platform designed to empower students with AI-assisted career counseling, personalized study planning, college directories, and interactive career assessment quizzes.

---

## ✨ Features

- **🧠 Interactive Career Assessment Quiz**: Evaluates student interests, aptitudes, and personality traits to suggest tailored career paths and undergraduate programs.
- **🏛️ College & University Directory**: Explore higher education institutions, eligibility criteria, and government scholarship benefits.
- **🗺️ Subject-to-Major Course Mapping**: Navigate connections between high school subjects and university majors.
- **💬 Educational AI Chatbot**: Quick resolution of academic and career guidance queries.
- **🌱 Student Wellness & Study Planner**: Tools to manage exam stress and organize daily study schedules.

---

## 🏗️ Architecture & Component Structure

```
EduPath/
├── Component/
│   ├── Common/        # Reusable UI components (ChatBot, Modal, Navigation)
│   └── Home/          # Landing page sections (Hero, Features, Benefits, 3D Background)
├── Entities/          # Data models & schemas (CareerPath, College, StudyPlan, etc.)
├── pages/             # Route views (CareerQuiz, Dashboard, CollegeDirectory, Resources)
└── layout.js.jsx      # Root application layout wrapper
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# 1. Clone repository
git clone https://github.com/GopiChoudhary19/EduPath.git
cd EduPath

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
