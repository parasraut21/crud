const Home = ({ user }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Welcome {user?.name}!
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Manage your tasks and stay organized with our todo list
        </p>
        <button 
          onClick={() => document.getElementById('todos')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition duration-300"
        >
          View My Todos
        </button>
      </div>
    </section>
  )
}

export default Home
