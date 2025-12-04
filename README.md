# Responsive Website with React & Tailwind CSS

A modern, responsive one-page website with authentication, todo list, gradient colors, and backend API.

## Features

- User Authentication (Login/Signup)
- Todo List with full CRUD operations
- Responsive design with Tailwind CSS
- Mobile sidebar with toggle button
- Gradient color scheme (purple, pink, blue)
- Contact form with backend integration
- Smooth scrolling navigation
- LocalStorage for frontend data persistence
- Backend API with JWT authentication

## Installation

```bash
npm install
```

This will install both frontend and backend dependencies.

## Running the Project

### Start Both Frontend & Backend (Recommended)
```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:3001`

### Or Start Separately

Frontend only:
```bash
npm run dev:client
```

Backend only:
```bash
npm run dev:server
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Todos (Protected)
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Other
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## Build for Production

```bash
npm run build
```

## Tech Stack

- React 18
- Tailwind CSS
- Vite
- Express.js
- JWT Authentication
- bcryptjs for password hashing
