import { useState } from 'react'
import { api } from '../api'

const STAGES = [
  { key: 'start', icon: '🟡', label: 'Start photo', hint: 'Photo when you arrive at the task site' },
  { key: 'during', icon: '🔵', label: 'During photo', hint: 'Photo while doing the work' },
  { key: 'completion', icon: '🟢', label: 'Completion photo', hint: 'Photo showing the completed work' },
]

export default function ProofModal({ assignmentId, taskTitle, onClose }) {
  const [uploads, setUploads] = useState({ start: null, during: null, completion: null })
  const [statuses, setStatuses] = useState({ start: '', during: '', completion: '' })

  function setStatus(stage, msg) {
    setStatuses(s => ({ ...s, [stage]: msg }))
  }

  async function upload(stage, file) {
    if (!file) return
    setStatus(stage, 'Uploading…')
    let lat = null, lng = null

    // Try GPS
    try {
      const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 }))
      lat = pos.coords.latitude
      lng = pos.coords.longitude
    } catch {}

    try {
      await api.uploadProof(assignmentId, stage, file, lat, lng)
      setStatus(stage, '✅ Uploaded')
      setUploads(u => ({ ...u, [stage]: file.name }))
    } catch (e) {
      setStatus(stage, '❌ ' + (e.data?.detail || 'Upload failed'))
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl p-7 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg">✕</button>

        <h2 className="font-black text-lg mb-1">Submit proof of work</h2>
        <p className="text-gray-500 text-sm mb-5">{taskTitle} — Upload photos at each stage. GPS and timestamp are captured automatically.</p>

        {STAGES.map(s => (
          <div key={s.key} className="mb-5">
            <div className="flex items-start gap-2 mb-2">
              <span>{s.icon}</span>
              <div>
                <div className="text-sm font-semibold">{s.label}</div>
                <div className="text-xs text-gray-400">{s.hint}</div>
              </div>
            </div>
            <input type="file" accept="image/*" capture="environment"
              onChange={e => upload(s.key, e.target.files[0])}
              className="w-full border-2 border-dashed border-gray-200 hover:border-green-400 rounded-lg p-3 text-sm cursor-pointer" />
            {statuses[s.key] && (
              <p className={`text-xs mt-1 ${statuses[s.key].startsWith('✅') ? 'text-green-600' : statuses[s.key].startsWith('❌') ? 'text-red-500' : 'text-gray-400'}`}>
                {statuses[s.key]}
              </p>
            )}
          </div>
        ))}

        <p className="text-xs text-gray-400">📍 Your location will be captured automatically when you upload each photo.</p>
      </div>
    </div>
  )
}
