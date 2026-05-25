import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import styles from './Step2OTP.module.css';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

export default function Step2OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone: string = location.state?.phone ?? '';
  const fullPhone: string = location.state?.fullPhone ?? '';
  const devOtpInitial: string = location.state?.devOtp ?? '';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [devOtp, setDevOtp] = useState<string>(devOtpInitial);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isFilled = otp.every(d => d !== '');

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function focusBox(i: number) { inputRefs.current[i]?.focus(); }
  function fillDevOtp() { setOtp(devOtp.split('')); focusBox(OTP_LENGTH - 1); }

  function handleChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp]; next[i] = digit; setOtp(next);
    setHasError(false); setErrorMsg('');
    if (digit && i < OTP_LENGTH - 1) focusBox(i + 1);
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) focusBox(i - 1);
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = [...otp];
    for (let i = 0; i < OTP_LENGTH; i++) next[i] = pasted[i] ?? '';
    setOtp(next);
    focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  async function handleVerify(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isFilled || loading) return;
    setLoading(true); setHasError(false); setErrorMsg('');
    try {
      const code = otp.join('');
      // Use window.confirmationResult set by Step1Phone
      if (window.confirmationResult) {
        const result = await window.confirmationResult.confirm(code);
        const idToken = await result.user.getIdToken();
        const data = await api.firebaseLogin(idToken);
        localStorage.setItem('gg_access', data.tokens.access);
        localStorage.setItem('gg_refresh', data.tokens.refresh);
        navigate(data.profile_complete ? '/find-tasks' : '/onboarding/path', { state: { phone } });
      } else {
        // Dev fallback
        const data = await api.verifyOTP(fullPhone, code);
        localStorage.setItem('gg_access', data.tokens.access);
        localStorage.setItem('gg_refresh', data.tokens.refresh);
        navigate(data.profile_complete ? '/find-tasks' : '/onboarding/path', { state: { phone } });
      }
    } catch {
      setHasError(true);
      setErrorMsg('Incorrect code. Please try again.');
    } finally { setLoading(false); }
  }

  async function handleResend() {
    if (countdown > 0) return;
    setOtp(Array(OTP_LENGTH).fill('')); setHasError(false); setErrorMsg(''); setCountdown(RESEND_COOLDOWN);
    setTimeout(() => focusBox(0), 0);
    try {
      const res = await api.requestOTP(fullPhone);
      setDevOtp(res.dev_otp || '');
    } catch {}
  }

  const formattedPhone = phone?.replace(/(\d{3})(\d{3})(\d{3,4})/, '$1 $2 $3') || '';

  return (
    <AuthLayout>
      <div className={styles.backRow}>
        <button className={styles.back} onClick={() => navigate(-1)} type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 9H3M8 4L3 9L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back
        </button>
      </div>
      <ProgressBar current={2} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Enter your code</h2>
        <p className={styles.sub}>Code sent to +{formattedPhone}</p>
        {devOtp && (
          <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>
            <strong style={{ color: '#92400e' }}>🧪 Dev mode</strong>
            <span style={{ color: '#78350f' }}> — Your code is: </span>
            <button type="button" onClick={fillDevOtp} style={{ fontWeight: 900, fontSize: 16, letterSpacing: 3, color: '#451a03', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>{devOtp}</button>
            <span style={{ color: '#92400e', fontSize: 11, marginLeft: 6 }}>(click to fill)</span>
          </div>
        )}
        <form onSubmit={handleVerify} noValidate>
          <div className={styles.boxes} onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input key={i} ref={(el) => { inputRefs.current[i] = el; }}
                type="text" inputMode="numeric" maxLength={1} value={digit}
                onChange={(e) => handleChange(i, e)} onKeyDown={(e) => handleKeyDown(i, e)}
                className={[styles.box, hasError ? styles.boxError : digit ? styles.boxFilled : ''].filter(Boolean).join(' ')}
                aria-label={`Digit ${i + 1}`} />
            ))}
          </div>
          {hasError && <p className={styles.errorText}>{errorMsg}</p>}
          <div className={styles.resendRow}>
            {countdown > 0 ? <span className={styles.resendCooldown}>Resend OTP in {countdown}s</span>
              : <button type="button" className={styles.resendBtn} onClick={handleResend}>Resend OTP</button>}
          </div>
          <button type="submit" disabled={loading}
            className={`${styles.btn} ${isFilled && !loading ? styles.btnActive : styles.btnMuted}`}>
            {loading ? 'Verifying…' : 'Verify'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
