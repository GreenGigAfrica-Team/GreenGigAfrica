import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from '../components/AuthLayout';
<<<<<<< Updated upstream
import { api } from '../api';
import styles from './LoginPhone.module.css';

const COUNTRIES = [
  { code: '+234', label: '🇳🇬 +234', maxLen: 10, pattern: /^[789]\d{9}$/, placeholder: '8XX XXX XXXX' },
  { code: '+251', label: '🇪🇹 +251', maxLen: 9,  pattern: /^\d{9}$/,       placeholder: '9XX XXX XXX' },
];

function formatDisplay(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

=======
import PhoneInput, { type PhoneValue } from '../components/PhoneInput';
import styles from './LoginPhone.module.css';

>>>>>>> Stashed changes
export default function LoginPhone() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const verifyPath = pathname.includes('signin') ? '/signin/verify' : '/login/verify';

<<<<<<< Updated upstream
  const [countryCode, setCountryCode] = useState('+234');
  const [digits, setDigits] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const country = COUNTRIES.find(c => c.code === countryCode)!;
  const isValid = country.pattern.test(digits);
  const showError = (touched && digits.length > 0 && !isValid) || !!error;
  const showHelper = isValid && !error;

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCountryCode(e.target.value);
    setDigits('');
    setTouched(false);
    setError('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, country.maxLen);
    setDigits(raw);
    setError('');
  }
=======
  const [phone, setPhone] = useState<PhoneValue>({ dialCode: '+234', digits: '', full: '', isValid: false });
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const showError = touched && phone.digits.length > 0 && !phone.isValid;
  const showHelper = phone.isValid && !error;

  // Initialise reCAPTCHA once when the component mounts
  useEffect(() => {
    recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-login', {
      size: 'invisible',
      callback: () => {},
    });
    recaptchaRef.current.render();

    return () => {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    };
  }, []);
>>>>>>> Stashed changes

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setTouched(true);
<<<<<<< Updated upstream
    if (!isValid) return;

    const fullPhone = countryCode + digits;
=======
    if (!phone.isValid || loading || !recaptchaRef.current) return;

>>>>>>> Stashed changes
    setLoading(true);
    setError('');

    try {
<<<<<<< Updated upstream
      const res = await api.requestOTP(fullPhone);
      navigate(verifyPath, {
        state: { phone: digits, fullPhone, countryCode, devOtp: res.dev_otp || '' },
      });
    } catch (e: any) {
      setError(e.message || 'Failed to send OTP. Try again.');
=======
      const confirmation = await signInWithPhoneNumber(auth, phone.full, recaptchaRef.current);
      navigate(verifyPath, {
        state: { phone: phone.digits, fullPhone: phone.full, confirmation },
      });
    } catch (err: unknown) {
      recaptchaRef.current?.clear();
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-login', {
        size: 'invisible',
        callback: () => {},
      });
      recaptchaRef.current.render();
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Try again.');
>>>>>>> Stashed changes
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <h2 className={styles.heading}>Welcome back</h2>
          <p className={styles.sub}>Enter your phone number and we'll send you a code to log in.</p>
          <form onSubmit={handleSubmit} noValidate>
<<<<<<< Updated upstream
            <label className={styles.label} htmlFor="phone">Phone number</label>
            <div className={[styles.inputWrap, showError ? styles.stateError : '', showHelper ? styles.stateValid : ''].filter(Boolean).join(' ')}>
              <select
                value={countryCode}
                onChange={handleCountryChange}
                className={styles.prefix}
                style={{ cursor: 'pointer', background: 'transparent', border: 'none', outline: 'none', fontWeight: 600 }}
                aria-label="Country code"
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                className={styles.input}
                placeholder={country.placeholder}
                value={formatDisplay(digits)}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
              />
            </div>
            {showError && (
              <p className={styles.errorText}>{error || `Please enter a valid ${countryCode} phone number`}</p>
            )}
            {showHelper && (
              <p className={styles.helperText}>We'll send a one-time code to {countryCode} {formatDisplay(digits)}</p>
=======
            <label className={styles.label} htmlFor="phone">
              Phone number
            </label>
            <PhoneInput
              onChange={(val) => { setPhone(val); setError(''); }}
              error={showError}
              valid={showHelper}
            />
            {showError && (
              <p className={styles.errorText}>Please enter a valid phone number</p>
            )}
            {showHelper && (
              <p className={styles.helperText}>We'll send a one time code to this number</p>
>>>>>>> Stashed changes
            )}
            {error && <p className={styles.errorText}>{error}</p>}

            <div id="recaptcha-login" />

            <button
              type="submit"
              disabled={loading}
<<<<<<< Updated upstream
              className={`${styles.btn} ${isValid && !loading ? styles.btnActive : styles.btnMuted}`}
=======
              className={`${styles.btn} ${phone.isValid && !loading ? styles.btnActive : styles.btnMuted}`}
>>>>>>> Stashed changes
            >
              {loading ? 'Sending…' : 'Send OTP'}
            </button>
          </form>
          <p className={styles.signupLink}>
            Don't have an account?{' '}
<<<<<<< Updated upstream
            <a href="#" className={styles.signupAnchor} onClick={e => { e.preventDefault(); navigate('/onboarding/phone'); }}>
=======
            <a
              href="#"
              className={styles.signupAnchor}
              onClick={(e) => { e.preventDefault(); navigate('/onboarding/phone'); }}
            >
>>>>>>> Stashed changes
              Sign up
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
