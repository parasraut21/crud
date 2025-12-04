const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">MyWebsite</h3>
            <p className="text-gray-200 mt-2">Building the future, one line at a time</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-200 transition">Privacy</a>
            <a href="#" className="hover:text-gray-200 transition">Terms</a>
            <a href="#" className="hover:text-gray-200 transition">About</a>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 pt-6 text-center text-gray-200">
          <p>&copy; 2024 MyWebsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
