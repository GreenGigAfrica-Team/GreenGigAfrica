import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import PhoneInput from '../components/PhoneInput'
import OtpInput from '../components/OtpInput'

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('+234')
  const [fullPhone, setFullPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [devOtp, setDevOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(0)

  function startTimer() {
    setTimer(60)
    const iv = setInterval(() => setTimer(t => { if (t <= 1) { clearInterval(iv); return 0 } return t - 1 }), 1000)
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
      setStep('otp')
      startTimer()
    } catch (e) {
      setError(e.message || 'Failed to send OTP.')
    } finally { setLoading(false) }
  }

  async function verifyOTP() {
    setError('')
    if (otp.length !== 6) { setError('Enter all 6 digits.'); return }
    setLoading(true)
    try {
      const data = await api.verifyOTP(fullPhone, otp)
      localStorage.setItem('gg_access', data.tokens.access)
      localStorage.setItem('gg_refresh', data.tokens.refresh)
      if (!data.profile_complete) { navigate('/signup'); return }
      navigate('/dashboard')
    } catch (e) {
      setError(e.message || 'Invalid code.')
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

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 md:flex-none md:w-[480px] bg-white p-10 flex flex-col overflow-y-auto">
        <Link to="/" className="text-lg font-black text-gray-900 mb-10 flex items-center gap-2">
          🌿 GreenGig <span className="text-green-600">Africa</span>
        </Link>

        {step === 'phone' && (
          <div>
            <h1 className="text-2xl font-black mb-2">Welcome back</h1>
            <p className="text-gray-500 text-sm mb-6">Enter your phone number to log in.</p>

            <label className="block text-sm font-semibold mb-1">Phone number</label>
            <PhoneInput value={phone} onChange={setPhone} onEnter={sendOTP} />
            <div className="mb-5"></div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <button onClick={sendOTP} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition">
              {loading ? 'Sending…' : 'Send verification code'}
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">Don't have an account? <Link to="/signup" className="text-green-600 font-semibold">Sign up</Link></p>
          </div>
        )}

        {step === 'otp' && (
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
              {loading ? 'Verifying…' : 'Log in'}
            </button>
            <p className="text-sm text-gray-500 text-center">
              {timer > 0 ? `Resend in ${timer}s` : <button onClick={sendOTP} className="text-green-600 font-semibold">Resend code</button>}
            </p>
            <p className="text-sm text-center mt-2"><button onClick={() => setStep('phone')} className="text-gray-400 hover:text-gray-600">← Change number</button></p>
          </div>
        )}
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #0d3d20 0%, #1a6b3c 60%, #2da05c 100%)' }}>
        <div className="max-w-sm">
          <div className="inline-block bg-white/15 border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">🌿 Verified climate work</div>
          <h2 className="text-3xl font-black text-white mb-3 leading-tight">Good to have you back</h2>
          <p className="text-white/80 text-base leading-relaxed mb-8">Your tasks, impact score, and earnings are waiting for you.</p>
          <div className="flex gap-8">
            <div><div className="text-3xl font-black text-white">₦32,000</div><div className="text-white/60 text-sm">avg. monthly earnings</div></div>
            <div><div className="text-3xl font-black text-white">45kg</div><div className="text-white/60 text-sm">avg. waste collected</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
