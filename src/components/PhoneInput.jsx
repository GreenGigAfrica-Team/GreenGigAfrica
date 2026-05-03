import { useState } from 'react'

const COUNTRIES = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
  { code: '+1',   flag: '🇺🇸', name: 'USA / Canada' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
]

export default function PhoneInput({ value, onChange, onEnter }) {
  const [dialCode, setDialCode] = useState('+234')
  const [localNumber, setLocalNumber] = useState('')

  function handleNumber(e) {
    const raw = e.target.value.replace(/\D/g, '')
    setLocalNumber(raw)
    onChange(dialCode + raw)
  }

  function handleDialCode(e) {
    const newCode = e.target.value
    setDialCode(newCode)
    onChange(newCode + localNumber)
  }

  return (
    <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-green-600 transition">
      <div className="relative flex-shrink-0">
        <select
          value={dialCode}
          onChange={handleDialCode}
          className="appearance-none bg-gray-100 border-r border-gray-200 pl-3 pr-6 py-3 text-sm font-semibold text-gray-600 outline-none cursor-pointer h-full"
          style={{ minWidth: '95px' }}
          aria-label="Country code"
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
      </div>

      <input
        type="tel"
        value={localNumber}
        onChange={handleNumber}
        onKeyDown={e => e.key === 'Enter' && onEnter?.()}
        placeholder="Phone number"
        inputMode="numeric"
        className="flex-1 px-3 py-3 text-sm outline-none bg-white min-w-0"
      />
    </div>
  )
}
