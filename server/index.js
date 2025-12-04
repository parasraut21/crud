import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = 3001
const JWT_SECRET = 'nothing'

// In-memory storage (using local variables)
let users = []
let todos = []

app.use(cors())
app.use(express.json())

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

// AUTH ROUTES

// Sign up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    name,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' })

  res.status(201).json({
    message: 'User created successfully',
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name }
  })
})

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = users.find(u => u.email === email)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' })

  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, email: user.email, name: user.name }
  })
})

// TODO CRUD ROUTES

// Get all todos for authenticated user
app.get('/api/todos', authenticateToken, (req, res) => {
  const userTodos = todos.filter(todo => todo.userId === req.user.id)
  res.json(userTodos)
})

// Create todo
app.post('/api/todos', authenticateToken, (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  const newTodo = {
    id: Date.now().toString(),
    userId: req.user.id,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString()
  }

  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// Update todo
app.put('/api/todos/:id', authenticateToken, (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body

  const todoIndex = todos.findIndex(t => t.id === id && t.userId === req.user.id)

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title !== undefined ? title : todos[todoIndex].title,
    description: description !== undefined ? description : todos[todoIndex].description,
    completed: completed !== undefined ? completed : todos[todoIndex].completed,
    updatedAt: new Date().toISOString()
  }

  res.json(todos[todoIndex])
})

// Delete todo
app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  const { id } = req.params

  const todoIndex = todos.findIndex(t => t.id === id && t.userId === req.user.id)

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  todos.splice(todoIndex, 1)
  res.json({ message: 'Todo deleted successfully' })
})

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body

  console.log('Contact form submission:')
  console.log('Name:', name)
  console.log('Email:', email)
  console.log('Message:', message)

  res.json({
    success: true,
    message: 'Thank you! Your message has been received.'
  })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    users: users.length,
    todos: todos.length
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
