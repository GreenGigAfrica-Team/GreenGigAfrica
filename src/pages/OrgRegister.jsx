import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import PhoneInput from '../components/PhoneInput'

export default function OrgRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState('form')
  const [form, setForm] = useState({ name: '', org_type: '', cac_number: '', contact_person_name: '', contact_phone: '+234', lagos_office_address: '' })
  const [fullPhone, setFullPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function goToOTP() {
    setError('')
    const { name, org_type, cac_number, contact_person_name, contact_phone, lagos_office_address } = form
    if (!name || !org_type || !cac_number || !contact_person_name || !lagos_office_address) {
      setError('Please fill in all fields.'); return
    }
    if (!contact_phone || contact_phone.replace(/^\+\d{1,4}/, '').length < 5) {
      setError('Enter a valid phone number.'); return
    }
    const fp = contact_phone
    setFullPhone(fp)
    setLoading(true)
    try {
      await api.requestOTP(fp)
      setStep('otp')
    } catch (e) { setError(e.data?.detail || 'Failed to send OTP.') }
    finally { setLoading(false) }
  }

  async function verifyAndRegister() {
    setError('')
    const code = otp.join('')
    if (code.length !== 6) { setError('Enter all 6 digits.'); return }
    setLoading(true)
    try {
      const d1 = await api.verifyOTP(fullPhone, code)
      localStorage.setItem('gg_access', d1.tokens.access)
      localStorage.setItem('gg_refresh', d1.tokens.refresh)
      await api.registerOrg({ ...form, contact_phone: fullPhone })
      setStep('done')
    } catch (e) { setError(e.data?.detail || JSON.stringify(e.data)) }
    finally { setLoading(false) }
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
      <div className="flex-1 md:flex-none md:w-[560px] bg-white p-10 flex flex-col overflow-y-auto">
        <Link to="/" className="text-lg font-black text-gray-900 mb-10 flex items-center gap-2">
          🌿 GreenGig <span className="text-green-600">Africa</span>
        </Link>

        {step === 'form' && (
          <div>
            <h1 className="text-2xl font-black mb-2">Register your organisation</h1>
            <p className="text-gray-500 text-sm mb-6">GreenGig manually reviews all organisations. You'll hear back within 24 hours.</p>

            {[
              { label: 'Organisation name', key: 'name', placeholder: 'e.g. WeCyclers Lagos' },
              { label: 'CAC registration number', key: 'cac_number', placeholder: 'e.g. RC-123456' },
              { label: 'Contact person name', key: 'contact_person_name', placeholder: 'Full name' },
              { label: 'Lagos office address', key: 'lagos_office_address', placeholder: 'Street, area, LGA' },
            ].map(f => (
              <div key={f.key} className="mb-4">
                <label className="block text-sm font-semibold mb-1">{f.label}</label>
                <input type="text" value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full border-2 border-gray-200 focus:border-green-600 rounded-lg px-3 py-3 text-sm outline-none" />
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Organisation type</label>
              <select value={form.org_type} onChange={e => set('org_type', e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-green-600 rounded-lg px-3 py-3 text-sm outline-none bg-white">
                <option value="">Select type</option>
                <option value="ngo">NGO</option>
                <option value="government">Government Agency</option>
                <option value="startup">Climate Startup</option>
                <option value="csr">CSR / Corporate Foundation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Contact phone number</label>
              <PhoneInput
                value={form.contact_phone}
                onChange={v => set('contact_phone', v)}
              />
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <button onClick={goToOTP} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition">
              {loading ? 'Please wait…' : 'Continue to verification'}
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">Already registered? <Link to="/login" className="text-green-600 font-semibold">Log in</Link></p>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <h1 className="text-2xl font-black mb-2">Verify your number</h1>
            <p className="text-gray-500 text-sm mb-6">We sent a code to <strong>{fullPhone}</strong></p>
            <div className="flex gap-2 mb-5">
              {otp.map((d, i) => (
                <input key={i} id={`otp-${i}`} type="text" value={d} maxLength={1} inputMode="numeric"
                  onChange={e => handleOtpInput(i, e.target.value)}
                  onKeyDown={e => handleOtpKey(i, e)}
                  className="flex-1 aspect-square text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-green-600 outline-none" />
              ))}
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
            <button onClick={verifyAndRegister} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition mb-3">
              {loading ? 'Submitting…' : 'Verify & submit'}
            </button>
            <p className="text-sm text-center"><button onClick={() => setStep('form')} className="text-gray-400 hover:text-gray-600">← Back</button></p>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <h1 className="text-2xl font-black mb-2">Application submitted!</h1>
            <p className="text-gray-500 mb-6">GreenGig will review your organisation and notify you within 24 hours. Once approved, you can post tasks.</p>
            <Link to="/" className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition text-center">Back to home</Link>
          </div>
        )}
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #0d3d20 0%, #1a6b3c 60%, #2da05c 100%)' }}>
        <div className="max-w-sm">
          <div className="inline-block bg-white/15 border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">🏢 For organisations</div>
          <h2 className="text-3xl font-black text-white mb-3 leading-tight">Coordinate climate work at scale</h2>
          <p className="text-white/80 text-base leading-relaxed mb-8">Post tasks, find verified workers, review GPS-tagged proof of work, and report impact to donors.</p>
          <div className="flex gap-8">
            <div><div className="text-lg font-black text-white">Manual review</div><div className="text-white/60 text-sm">all orgs verified by GreenGig</div></div>
            <div><div className="text-lg font-black text-white">CAC required</div><div className="text-white/60 text-sm">registered Nigerian entities only</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
