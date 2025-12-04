import { useState } from 'react'

const Navbar = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false)

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
    }

    return (
        <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-2xl font-bold">MyWebsite</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => scrollToSection('home')} className="hover:text-gray-200 transition">Home</button>
                        <button onClick={() => scrollToSection('todos')} className="hover:text-gray-200 transition">Todos</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-gray-200 transition">Contact</button>
                        <div className="flex items-center gap-4">
                            <span className="text-sm">Hi, {user?.name}</span>
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`md:hidden fixed top-16 right-0 h-full w-64 bg-gradient-to-b from-purple-700 to-blue-700 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col p-6 space-y-4">
                    <div className="pb-4 border-b border-white/20">
                        <p className="text-sm text-gray-200">Logged in as</p>
                        <p className="font-semibold">{user?.name}</p>
                    </div>
                    <button onClick={() => scrollToSection('home')} className="text-left py-2 px-4 hover:bg-white/10 rounded-lg transition">Home</button>
                    <button onClick={() => scrollToSection('todos')} className="text-left py-2 px-4 hover:bg-white/10 rounded-lg transition">Todos</button>
                    <button onClick={() => scrollToSection('contact')} className="text-left py-2 px-4 hover:bg-white/10 rounded-lg transition">Contact</button>
                    <button
                        onClick={() => {
                            onLogout()
                            setIsOpen(false)
                        }}
                        className="text-left py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/50 top-16"
                />
            )}
        </nav>
    )
}

export default Navbar
