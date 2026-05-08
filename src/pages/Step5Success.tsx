import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import styles from './Step5Success.module.css';

export default function Step5Success() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className={styles.center}>
        <div className={styles.ring}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
            <circle cx="36" cy="36" r="36" fill="var(--color-primary)" />
            <path
              d="M22 37L31 46L50 26"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className={styles.heading}>You're all set!</h2>
        <p className={styles.sub}>Your profile is set up. Start finding climate work near you.</p>
        <button
          type="button"
          className={styles.btn}
          onClick={() => navigate('/onboarding/phone')}
        >
          Find climate jobs near me
        </button>
      </div>
    </AuthLayout>
  );
}
