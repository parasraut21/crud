import { useState, useEffect } from 'react'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: '', description: '' })

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Create
  const handleCreate = (e) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return

    const todo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTodos([...todos, todo])
    setNewTodo({ title: '', description: '' })
  }

  // Update
  const handleUpdate = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, ...editData, updatedAt: new Date().toISOString() }
        : todo
    ))
    setEditingId(null)
    setEditData({ title: '', description: '' })
  }

  // Delete
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Toggle complete
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditData({ title: todo.title, description: todo.description })
  }

  return (
    <section id="todos" className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
          My Todo List
        </h2>

        {/* Create Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              type="text"
              placeholder="Todo title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTodo.description}
              onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
              rows="2"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              Add Todo
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No todos yet. Create your first one!</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                {editingId === todo.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 outline-none"
                    />
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 outline-none resize-none"
                      rows="2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id)}
                          className="mt-1 w-5 h-5 cursor-pointer"
                        />
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {todo.title}
                          </h3>
                          {todo.description && (
                            <p className={`mt-2 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                              {todo.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => startEdit(todo)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(todo.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default TodoList
