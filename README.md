# 📝 Personal Notes App

A full-stack web application where users can register, log in, and manage their personal notes — securely and privately.

---

## 🚀 Features

- User registration and login
- JWT-based authentication
- Create, view, and delete personal notes
- Notes are private — each user only sees their own
- Persistent storage with SQLite

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | SQLite |
| Auth | JWT (JSON Web Tokens) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Folder Structure

```
notes-app/
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── Notes.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── NoteCard.jsx
│       ├── services/
│       │   └── api.js
│       └── App.jsx
│
└── backend/
    ├── server.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── noteRoutes.js
    ├── controllers/
    ├── middleware/
    └── database/
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create a new account |
| POST | `/login` | Login and receive a JWT token |
| GET | `/notes` | Get all notes for logged-in user |
| POST | `/notes` | Add a new note |
| DELETE | `/notes/:id` | Delete a note by ID |

All `/notes` routes are protected and require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js installed
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/shree-sai-lakshmi03/notes-app.git
cd notes-app
```

### 2. Set up the backend

```bash
cd backend
npm install
node server.js
```

Backend runs on `http://localhost:5000`

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🗄️ Database Schema

**Users**

| id | name | email | password |
|---|---|---|---|

**Notes**

| id | title | user_id |
|---|---|---|

---

## 🌐 Deployment

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
