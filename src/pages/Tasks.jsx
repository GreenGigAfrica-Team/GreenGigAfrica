import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import TaskCard from '../components/TaskCard'
import Sidebar from '../components/Sidebar'

const LGAS = ['', 'alimosho', 'epe', 'ikorodu', 'mushin', 'lekki', 'other']
const TYPES = ['', 'waste_collection', 'tree_planting', 'urban_farming', 'climate_data', 'recycling', 'community_education']

export default function Tasks() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [lga, setLga] = useState('')
  const [type, setType] = useState('')
  const [volOnly, setVolOnly] = useState('')

  function logout() {
    localStorage.removeItem('gg_access')
    localStorage.removeItem('gg_refresh')
    navigate('/')
  }

  async function load() {
    setLoading(true)
    try {
      const params = {}
      if (lga) params.lga = lga
      if (type) params.task_type = type
      if (volOnly) params.volunteer_only = volOnly
      const data = await api.getTasks(params)
      setTasks(Array.isArray(data) ? data : data.results || [])
    } catch { setTasks([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [lga, type, volOnly])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="tasks" onLogout={logout} />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '240px' }}>
        <header className="bg-white border-b border-gray-200 px-7 flex items-center justify-between sticky top-0 z-40" style={{ height: '60px' }}>
          <h1 className="font-bold text-lg">Find tasks</h1>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-600">Log out</button>
        </header>
        <main className="p-7">
          {/* Filters */}
          <div className="flex gap-3 flex-wrap mb-6">
            <select value={lga} onChange={e => setLga(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-green-600">
              <option value="">All LGAs</option>
              {LGAS.filter(Boolean).map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-green-600">
              <option value="">All task types</option>
              {TYPES.filter(Boolean).map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
            </select>
            <select value={volOnly} onChange={e => setVolOnly(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-green-600">
              <option value="">Paid & volunteer</option>
              <option value="false">Paid only</option>
              <option value="true">Volunteer only</option>
            </select>
          </div>

          {loading ? (
            <div className="text-gray-400 text-sm py-12 text-center">Loading tasks…</div>
          ) : tasks.length ? (
            <div className="grid md:grid-cols-3 gap-4">
              {tasks.map(task => <TaskCard key={task.id} task={task} onAccepted={load} />)}
            </div>
          ) : (
            <div className="text-gray-400 text-sm py-12 text-center bg-white rounded-xl border border-gray-100">No tasks found. Try changing the filters.</div>
          )}
        </main>
      </div>
    </div>
  )
}
