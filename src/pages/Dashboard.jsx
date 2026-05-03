import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import TaskCard from '../components/TaskCard'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [matched, setMatched] = useState([])
  const [myTasks, setMyTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.me().then(setProfile).catch(() => navigate('/login')),
      api.matchedTasks(6).then(d => setMatched(d.results || [])).catch(() => {}),
      api.myTasks().then(d => setMyTasks(d.filter(a => ['accepted','submitted'].includes(a.assignment_status)))).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  function logout() {
    localStorage.removeItem('gg_access')
    localStorage.removeItem('gg_refresh')
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="dashboard" onLogout={logout} />

      <div className="flex-1 flex flex-col" style={{ marginLeft: '240px' }}>
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-7 h-15 flex items-center justify-between sticky top-0 z-40" style={{ height: '60px' }}>
          <span className="font-semibold text-gray-900">{profile?.full_name || 'Loading…'}</span>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-600">Log out</button>
        </header>

        <main className="p-7 flex-1">
          {/* Welcome */}
          <div className="rounded-xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-7"
            style={{ background: 'linear-gradient(135deg, #1a6b3c, #22874d)' }}>
            <div>
              <h1 className="text-xl font-black text-white mb-1">Welcome back, {profile?.full_name?.split(' ')[0] || '…'} 👋</h1>
              <p className="text-white/75 text-sm">Here's what's available near you today.</p>
            </div>
            {profile && (
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white/15 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">✅ {profile.total_tasks_completed} tasks done</span>
                <span className="bg-white/15 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">🌿 {profile.impact_score} impact score</span>
                {Number(profile.total_earnings) > 0 && (
                  <span className="bg-white/15 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">₦{Number(profile.total_earnings).toLocaleString()} earned</span>
                )}
              </div>
            )}
          </div>

          {/* Matched tasks */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">🤖 Recommended for you</h2>
              <Link to="/dashboard/tasks" className="text-sm font-semibold text-green-600 hover:underline">See all →</Link>
            </div>
            {loading ? (
              <div className="text-gray-400 text-sm py-8 text-center">Finding tasks near you…</div>
            ) : matched.length ? (
              <div className="grid md:grid-cols-3 gap-4">
                {matched.map(task => <TaskCard key={task.id} task={task} onAccepted={() => api.myTasks().then(d => setMyTasks(d.filter(a => ['accepted','submitted'].includes(a.assignment_status))))} />)}
              </div>
            ) : (
              <div className="text-gray-400 text-sm py-8 text-center bg-white rounded-xl border border-gray-100">No tasks in your area yet. Check back soon.</div>
            )}
          </section>

          {/* My active tasks */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">📋 My active tasks</h2>
              <Link to="/dashboard/my-tasks" className="text-sm font-semibold text-green-600 hover:underline">View all →</Link>
            </div>
            {myTasks.length ? (
              <div className="grid md:grid-cols-3 gap-4">
                {myTasks.map(a => <TaskCard key={a.task.id} task={a.task} assignmentId={a.assignment_id} assignmentStatus={a.assignment_status} />)}
              </div>
            ) : (
              <div className="text-gray-400 text-sm py-8 text-center bg-white rounded-xl border border-gray-100">
                No active tasks. <Link to="/dashboard/tasks" className="text-green-600 font-semibold">Find one →</Link>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
