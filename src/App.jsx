import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Auth from './components/Auth'
import TodoList from './components/TodoList'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setToken(null)
  }

  // Show auth page if not logged in
  if (!user) {
    return <Auth onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar user={user} onLogout={handleLogout} />
      <Home user={user} />
      <TodoList />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
