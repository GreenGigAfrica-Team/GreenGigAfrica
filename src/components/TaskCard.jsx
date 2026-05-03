import { useState } from 'react'
import { api } from '../api'
import ProofModal from './ProofModal'

const TYPE_ICONS = { waste_collection: '🗑️', tree_planting: '🌳', urban_farming: '🌾', climate_data: '📊', recycling: '♻️', community_education: '📚' }
const STATUS_COLORS = { accepted: 'bg-blue-100 text-blue-700', submitted: 'bg-yellow-100 text-yellow-700', approved: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700' }

function fmt(dt) {
  return new Date(dt).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function TaskCard({ task, assignmentId = null, assignmentStatus = null, onAccepted }) {
  const [status, setStatus] = useState(assignmentStatus)
  const [loading, setLoading] = useState(false)
  const [showProof, setShowProof] = useState(false)

  async function accept() {
    setLoading(true)
    try {
      await api.acceptTask(task.id)
      setStatus('accepted')
      onAccepted?.()
    } catch (e) {
      alert(e.data?.detail || 'Could not accept task.')
    } finally { setLoading(false) }
  }

  return (
    <>
      <article className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {TYPE_ICONS[task.task_type]} {task.task_type.replace(/_/g, ' ')}
          </span>
          {status && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-500'}`}>
              {status}
            </span>
          )}
        </div>

        <h3 className="font-bold text-base mb-1 leading-snug">{task.title}</h3>
        <p className="text-gray-400 text-xs mb-3">by {task.organisation_name}</p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-4">
          <span>📍 {task.location_lga}</span>
          <span>📅 {fmt(task.start_datetime)}</span>
          <span>👥 {task.spots_remaining > 0 ? `${task.spots_remaining} spots left` : 'Full'}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          {task.is_volunteer_only
            ? <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Volunteer</span>
            : <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">₦{Number(task.pay_per_worker).toLocaleString()}</span>
          }

          {status ? (
            <button onClick={() => setShowProof(true)}
              className="text-xs font-semibold text-green-600 border border-green-600 px-3 py-1.5 rounded-lg hover:bg-green-50 transition">
              View / Submit proof
            </button>
          ) : task.is_full ? (
            <span className="text-xs text-gray-400">Full</span>
          ) : (
            <button onClick={accept} disabled={loading}
              className="text-xs font-semibold bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg transition">
              {loading ? 'Accepting…' : 'Accept task'}
            </button>
          )}
        </div>
      </article>

      {showProof && assignmentId && (
        <ProofModal assignmentId={assignmentId} taskTitle={task.title} onClose={() => setShowProof(false)} />
      )}
    </>
  )
}
