import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Link to="/" className="font-black text-lg text-gray-900 flex items-center gap-2">
          🌿 GreenGig <span className="text-green-600">Africa</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-green-700 transition">How it works</a>
          <a href="#task-types" className="text-sm font-medium text-gray-500 hover:text-green-700 transition">Task types</a>
          <a href="#trust" className="text-sm font-medium text-gray-500 hover:text-green-700 transition">Verification</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg transition">Log in</Link>
          <Link to="/signup" className="text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition">Sign up</Link>
        </div>
      </div>
    </header>
  )
}
