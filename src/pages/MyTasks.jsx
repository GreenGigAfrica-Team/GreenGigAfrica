import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import TaskCard from '../components/TaskCard'
import Sidebar from '../components/Sidebar'

export default function MyTasks() {
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  function logout() {
    localStorage.removeItem('gg_access')
    localStorage.removeItem('gg_refresh')
    navigate('/')
  }

  async function load() {
    setLoading(true)
    try {
      const data = await api.myTasks()
      setAssignments(data)
    } catch { setAssignments([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const statusColor = { accepted: 'bg-blue-100 text-blue-700', submitted: 'bg-yellow-100 text-yellow-700', approved: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700', withdrawn: 'bg-gray-100 text-gray-500' }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="my-tasks" onLogout={logout} />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '240px' }}>
        <header className="bg-white border-b border-gray-200 px-7 flex items-center justify-between sticky top-0 z-40" style={{ height: '60px' }}>
          <h1 className="font-bold text-lg">My tasks</h1>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-600">Log out</button>
        </header>
        <main className="p-7">
          {loading ? (
            <div className="text-gray-400 text-sm py-12 text-center">Loading…</div>
          ) : assignments.length ? (
            <div className="grid md:grid-cols-3 gap-4">
              {assignments.map(a => (
                <TaskCard key={a.task.id} task={a.task}
                  assignmentId={a.assignment_id}
                  assignmentStatus={a.assignment_status}
                  onAccepted={load} />
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm py-12 text-center bg-white rounded-xl border border-gray-100">
              You haven't accepted any tasks yet.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
