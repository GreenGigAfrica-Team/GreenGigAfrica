import { Link } from 'react-router-dom'

const NAV = [
  { id: 'dashboard', label: '🏠 Dashboard', to: '/dashboard' },
  { id: 'tasks', label: '🔍 Find tasks', to: '/dashboard/tasks' },
  { id: 'my-tasks', label: '📋 My tasks', to: '/dashboard/my-tasks' },
]

export default function Sidebar({ active, onLogout }) {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-60 bg-gray-900 flex flex-col z-50">
      <Link to="/" className="flex items-center gap-2 font-black text-white text-base px-5 py-5 border-b border-white/10">
        🌿 GreenGig <span className="text-green-400">Africa</span>
      </Link>
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {NAV.map(n => (
          <Link key={n.id} to={n.to}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active === n.id ? 'bg-green-700 text-white font-semibold' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}>
            {n.label}
          </Link>
        ))}
      </nav>
      <button onClick={onLogout} className="mx-3 mb-4 px-3 py-2.5 text-sm text-white/40 hover:text-white text-left rounded-lg hover:bg-white/6 transition">
        ← Log out
      </button>
    </aside>
  )
}
