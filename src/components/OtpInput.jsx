export default function OtpInput({ value, onChange }) {
  // value is a 6-char string, onChange(newString)
  const digits = value.padEnd(6, '').split('').slice(0, 6)

  function handleInput(i, val) {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    onChange(next.join(''))
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus()
  }

  function handleKey(i, e) {
    if (e.key === 'Backspace') {
      if (!digits[i] && i > 0) {
        const next = [...digits]
        next[i - 1] = ''
        onChange(next.join(''))
        document.getElementById(`otp-${i - 1}`)?.focus()
      }
    }
    // Allow paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) return
  }

  function handlePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted.padEnd(6, ''))
    const focusIdx = Math.min(pasted.length, 5)
    document.getElementById(`otp-${focusIdx}`)?.focus()
  }

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          value={d}
          maxLength={1}
          onChange={e => handleInput(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          className="w-10 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none transition bg-white"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}
