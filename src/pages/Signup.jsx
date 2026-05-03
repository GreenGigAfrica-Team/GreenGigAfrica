import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import PhoneInput from '../components/PhoneInput'
import OtpInput from '../components/OtpInput'

const STEPS = { PHONE: 'phone', OTP: 'otp', PROFILE: 'profile', DONE: 'done' }
const LGAS = ['alimosho', 'epe', 'ikorodu', 'mushin', 'lekki', 'other']
const INTERESTS = [
  { value: 'waste_collection', label: '🗑️ Waste Collection' },
  { value: 'tree_planting', label: '🌳 Tree Planting' },
  { value: 'urban_farming', label: '🌾 Urban Farming' },
  { value: 'climate_data', label: '📊 Climate Data' },
  { value: 'recycling', label: '♻️ Recycling' },
  { value: 'community_education', label: '📚 Community Ed' },
]

export default function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(STEPS.PHONE)
  const [role, setRole] = useState('job_seeker')
  const [phone, setPhone] = useState('+234')
  const [fullPhone, setFullPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [devOtp, setDevOtp] = useState('')
  const [fullName, setFullName] = useState('')
  const [lga, setLga] = useState('')
  const [interests, setInterests] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(0)

  function startTimer() {
    setTimer(60)
    const iv = setInterval(() => setTimer(t => { if (t <= 1) { clearInterval(iv); return 0; } return t - 1; }), 1000)
  }

  async function sendOTP() {
    setError('')
    if (!phone || phone.replace(/^\+\d{1,4}/, '').length < 5) {
      setError('Enter a valid phone number.'); return
    }
    const fp = phone
    setFullPhone(fp)
    setLoading(true)
    try {
      const res = await api.requestOTP(fp)
      setDevOtp(res.dev_otp || '')
      setStep(STEPS.OTP)
      startTimer()
    } catch (e) {
      setError(e.message || 'Failed to send OTP.')
    } finally { setLoading(false) }
  }

  async function verifyOTP() {
    setError('')
    if (otp.length !== 6 || otp.includes('')) {
      setError('Enter all 6 digits.'); return
    }
    setLoading(true)
    try {
      const data = await api.verifyOTP(fullPhone, otp)
      localStorage.setItem('gg_access', data.tokens.access)
      localStorage.setItem('gg_refresh', data.tokens.refresh)
      if (data.profile_complete) { navigate('/dashboard'); return }
      setStep(STEPS.PROFILE)
    } catch (e) {
      setError(e.message || 'Invalid code.')
    } finally { setLoading(false) }
  }

  async function saveProfile() {
    setError('')
    if (!fullName.trim()) { setError('Enter your full name.'); return }
    if (!lga) { setError('Select your LGA.'); return }
    if (!interests.length) { setError('Pick at least one task interest.'); return }
    setLoading(true)
    try {
      await api.setupProfile({ full_name: fullName, lga, task_interests: interests, role })
      setStep(STEPS.DONE)
    } catch (e) {
      setError(e.message || 'Something went wrong.')
    } finally { setLoading(false) }
  }

  function handleOtpInput(i, val) {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[i] = val; setOtp(next)
    if (val && i < 5) document.getElementById(`otp-${i+1}`)?.focus()
  }
  function handleOtpKey(i, e) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) document.getElementById(`otp-${i-1}`)?.focus()
  }
  function toggleInterest(v) {
    setInterests(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  }

  return (
    <div className="min-h-screen flex">
      {/* Card */}
      <div className="flex-1 md:flex-none md:w-[480px] bg-white p-10 flex flex-col overflow-y-auto">
        <Link to="/" className="text-lg font-black text-gray-900 mb-10 flex items-center gap-2">
          🌿 GreenGig <span className="text-green-600">Africa</span>
        </Link>

        {/* PHONE */}
        {step === STEPS.PHONE && (
          <div>
            <h1 className="text-2xl font-black mb-2">Create your account</h1>
            <p className="text-gray-500 text-sm mb-6">Enter your phone number to get started. No email needed.</p>

            <div className="flex gap-2 mb-6">
              {[{ v: 'job_seeker', l: '💼 Find work' }, { v: 'volunteer', l: '🌱 Volunteer' }, { v: 'organisation', l: '🏢 Post tasks' }].map(r => (
                <button key={r.v} onClick={() => r.v === 'organisation' ? navigate('/org-register') : setRole(r.v)}
                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-semibold transition ${role === r.v ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>
                  {r.l}
                </button>
              ))}
            </div>

            <label className="block text-sm font-semibold mb-1">Phone number</label>
            <PhoneInput value={phone} onChange={setPhone} onEnter={sendOTP} />
            <p className="text-xs text-gray-400 mt-1 mb-5">We'll send a verification code via SMS</p>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <button onClick={sendOTP} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition">
              {loading ? 'Sending…' : 'Send verification code'}
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">Already have an account? <Link to="/login" className="text-green-600 font-semibold">Log in</Link></p>
          </div>
        )}

        {step === STEPS.OTP && (
          <div>
            <h1 className="text-2xl font-black mb-2">Enter your code</h1>
            <p className="text-gray-500 text-sm mb-5">We sent a 6-digit code to <strong>{fullPhone}</strong></p>

            {devOtp && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-4 text-sm">
                <span className="font-semibold text-yellow-800">🧪 Dev mode — SMS not configured</span>
                <br />
                <span className="text-yellow-700">Your code is: </span>
                <button onClick={() => setOtp(devOtp)}
                  className="font-black text-yellow-900 text-base tracking-widest hover:underline">
                  {devOtp}
                </button>
                <span className="text-yellow-600 text-xs ml-1">(click to fill)</span>
              </div>
            )}

            <OtpInput value={otp} onChange={setOtp} />

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mt-4">{error}</div>}

            <button onClick={verifyOTP} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition mt-5 mb-4">
              {loading ? 'Verifying…' : 'Verify code'}
            </button>
            <p className="text-sm text-gray-500 text-center">
              {timer > 0 ? `Resend in ${timer}s` : <button onClick={sendOTP} className="text-green-600 font-semibold">Resend code</button>}
            </p>
            <p className="text-sm text-center mt-2"><button onClick={() => setStep(STEPS.PHONE)} className="text-gray-400 hover:text-gray-600">← Change number</button></p>
          </div>
        )}

        {/* PROFILE */}
        {step === STEPS.PROFILE && (
          <div>
            <h1 className="text-2xl font-black mb-2">Set up your profile</h1>
            <p className="text-gray-500 text-sm mb-6">Just 3 fields — takes under a minute.</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Full name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Amina Bello"
                className="w-full border-2 border-gray-200 focus:border-green-600 rounded-lg px-3 py-3 text-sm outline-none" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Your LGA</label>
              <select value={lga} onChange={e => setLga(e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-green-600 rounded-lg px-3 py-3 text-sm outline-none bg-white">
                <option value="">Select your LGA</option>
                {LGAS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">Task interests <span className="font-normal text-gray-400">(pick all that apply)</span></label>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map(i => (
                  <button key={i.value} onClick={() => toggleInterest(i.value)}
                    className={`py-2 px-3 rounded-lg border-2 text-sm font-medium text-left transition ${interests.includes(i.value) ? 'border-green-600 bg-green-50 text-green-700 font-semibold' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>
                    {i.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <button onClick={saveProfile} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition">
              {loading ? 'Saving…' : 'Complete setup'}
            </button>
          </div>
        )}

        {/* DONE */}
        {step === STEPS.DONE && (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-black mb-2">You're in!</h1>
            <p className="text-gray-500 mb-6">Your account is ready. Start finding climate work near you.</p>
            <button onClick={() => navigate('/dashboard')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
              Go to dashboard
            </button>
          </div>
        )}
      </div>

      {/* Side panel */}
      <div className="hidden md:flex flex-1 items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #0d3d20 0%, #1a6b3c 60%, #2da05c 100%)' }}>
        <div className="max-w-sm">
          <div className="inline-block bg-white/15 border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">🌿 Verified climate work</div>
          <h2 className="text-3xl font-black text-white mb-3 leading-tight">Join Lagos's climate workforce</h2>
          <p className="text-white/80 text-base leading-relaxed mb-8">Find paid tasks near you, submit proof of work, and get paid via OPay or PalmPay.</p>
          <div className="flex gap-8">
            <div><div className="text-3xl font-black text-white">25,000+</div><div className="text-white/60 text-sm">green jobs in Lagos</div></div>
            <div><div className="text-3xl font-black text-white">2 LGAs</div><div className="text-white/60 text-sm">active at launch</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
