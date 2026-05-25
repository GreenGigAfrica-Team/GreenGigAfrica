import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from '../components/AuthLayout';
import PhoneInput, { type PhoneValue } from '../components/PhoneInput';
import styles from './LoginPhone.module.css';

export default function LoginPhone() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const verifyPath = pathname.includes('signin') ? '/signin/verify' : '/login/verify';

  const [phone, setPhone] = useState<PhoneValue>({ dialCode: '+234', digits: '', full: '', isValid: false });
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const showError = touched && phone.digits.length > 0 && !phone.isValid;
  const showHelper = phone.isValid && !error;

  function setupRecaptcha() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'login-button', {
        size: 'invisible',
        callback: () => {},
      });
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setTouched(true);
    if (!phone.isValid || loading) return;

    setLoading(true);
    setError('');

    try {
      setupRecaptcha();
      let devOtp = '';
      try {
        const confirmation = await signInWithPhoneNumber(auth, phone.full, window.recaptchaVerifier);
        window.confirmationResult = confirmation;
      } catch {
        window.confirmationResult = null as any;
        const res = await api.requestOTP(phone.full);
        devOtp = res.dev_otp ?? '';
      }
      navigate(verifyPath, { state: { phone: phone.digits, fullPhone: phone.full, devOtp } });
    } catch (err: unknown) {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId) => {
          // @ts-ignore
          if (window.grecaptcha) window.grecaptcha.reset(widgetId);
        });
      }
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Try again.');
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
            <label className={styles.label} htmlFor="phone">Phone number</label>
            <PhoneInput onChange={(val) => { setPhone(val); setError(''); }} error={showError} valid={showHelper} />
            {showError && <p className={styles.errorText}>Please enter a valid phone number</p>}
            {showHelper && <p className={styles.helperText}>We'll send a one time code to this number</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            <button
              id="login-button"
              type="submit"
              disabled={loading}
              className={`${styles.btn} ${phone.isValid && !loading ? styles.btnActive : styles.btnMuted}`}
            >
              {loading ? 'Sending…' : 'Send OTP'}
            </button>
          </form>
          <p className={styles.signupLink}>
            Don't have an account?{' '}
            <a href="#" className={styles.signupAnchor} onClick={(e) => { e.preventDefault(); navigate('/onboarding/phone'); }}>Sign up</a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
