import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import styles from './Step3WorkPath.module.css';

type PathChoice = 'paid' | 'volunteer';

const PATHS: {
  id: PathChoice;
  icon: string;
  title: string;
  desc: string;
  badge: string;
}[] = [
  {
    id: 'paid',
    icon: '💰',
    title: 'Find paid work',
    desc: 'Complete climate tasks and earn money paid',
    badge: 'Earn per task',
  },
  {
    id: 'volunteer',
    icon: '🌱',
    title: 'Volunteer',
    desc: 'Contribute and earn recognition.',
    badge: 'Certificate + impact score',
  },
];

export default function Step3WorkPath() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state ?? {};

  const [selected, setSelected] = useState<PathChoice | null>(null);

  function handleContinue() {
    if (!selected) return;
    navigate('/onboarding/profile', { state: { phone, path: selected } });
  }

  return (
    <AuthLayout>
      <div className={styles.backRow}>
        <button className={styles.back} onClick={() => navigate(-1)} type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M15 9H3M8 4L3 9L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>
      <ProgressBar current={3} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Choose your climate work path</h2>
        <p className={styles.sub}>Choose one to continue</p>
        <div className={styles.cards}>
          {PATHS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`${styles.card} ${selected === p.id ? styles.cardSelected : ''}`}
              onClick={() => setSelected(p.id)}
            >
              <div className={styles.iconWrap}>{p.icon}</div>
              <strong className={styles.cardTitle}>{p.title}</strong>
              <p className={styles.cardDesc}>{p.desc}</p>
              <span className={styles.badge}>{p.badge}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleContinue}
          className={`${styles.btn} ${selected ? styles.btnActive : styles.btnMuted}`}
        >
          Continue
        </button>
      </div>
    </AuthLayout>
  );
}
