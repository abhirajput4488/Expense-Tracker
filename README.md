# 💰 Expense Tracker - Full Stack MERN Application

A production-grade, multi-user Expense Tracker built with the MERN (MongoDB, Express, React, Node.js) stack. This application features high financial precision, secure JWT authentication, idempotency for duplicate prevention, and a stunning glassmorphic UI.

---

## 🚀 Key Features

- **🔐 Secure Authentication**: Multi-user support with JWT-based sessions and Bcrypt password hashing.
- **🛡️ Data Isolation**: Users can only access and manage their own private expenses.
- **💎 Premium UX/UI**: Modern, responsive dashboard with **Glassmorphism** design, real-time calculations, and smooth animations.
- **💸 Financial Precision**: Amounts are stored as **integers (cents)** to avoid floating-point arithmetic errors.
- **🔄 Idempotency**: Custom middleware using unique `x-idempotency-key` headers to prevent duplicate entries during network retries.
- **🔍 Advanced Analytics**: Filter expenses by category and sort by date with instant UI updates.
- **⚡ Performance**: Built with **Vite** for the frontend and **Nodemon** for a fast backend development cycle.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Functional components with Hooks.
- **Context API**: Global state management for user authentication.
- **React Router**: Client-side routing for Login, Register, and Dashboard.
- **Axios**: HTTP client with request interceptors for automatic JWT handling.
- **Lucide Icons**: Clean, modern iconography.

### Backend
- **Node.js & Express**: High-performance RESTful API.
- **MongoDB & Mongoose**: Scalable NoSQL database with schema-based modeling.
- **JWT (JSON Web Token)**: Stateless session management.
- **Bcryptjs**: Industrial-strength password encryption.
- **Helmet & CORS**: Essential security middleware for protection against common web vulnerabilities.
- **Express-Validator**: Rigorous input sanitization and validation.

---

## 📂 Project Structure

```text
Expense-Tracker/
├── backend/            # Express Server Logic
│   ├── src/
│   │   ├── config/     # Database utilities
│   │   ├── controllers/# Business logic (Auth, Expenses)
│   │   ├── middleware/ # Auth, Idempotency, Error handling
│   │   ├── models/     # Mongoose Schemas (User, Expense)
│   │   └── routes/     # API Endpoint definitions
├── frontend/           # React Web Application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global Authentication context
│   │   ├── services/   # API abstraction layer
│   │   └── index.css   # Modern Design System
└── package.json        # Root scripts for monorepo management
```

---

## ⚙️ Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/) (Local server or Atlas cluster).

### 2. Environment Setup
Create a `.env` in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Create a `.env` in the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Installation
From the root directory:
```bash
# Install dependencies for the entire project
npm install
```

### 4. Running the App
```bash
# Start both Frontend & Backend concurrently
npm run dev
```
- **UI**: [http://localhost:5173](http://localhost:5173)
- **API**: [http://localhost:5000](http://localhost:5000)

---

## 🛡️ API Reference

### User Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Log in and receive JWT |
| `GET` | `/api/auth/me` | Get current user profile (Private) |

### Expense Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/expenses` | Create an expense (Private + Idempotent) |
| `GET` | `/api/expenses` | Get all user-specific expenses (Private) |

---

## 📝 License
Built with passion for modern financial management.
