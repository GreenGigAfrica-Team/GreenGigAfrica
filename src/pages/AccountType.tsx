import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountType.module.css';

type AccountType = 'jobseeker' | 'volunteer' | 'org';

const CARDS: { id: AccountType; icon: string; title: string; description: string; badge: string; points: string[] }[] = [
  {
    id: 'jobseeker',
    icon: '💰',
    title: 'Job Seeker',
    description: 'Find paid climate tasks near you and earn money via mobile wallet.',
    badge: 'Earn per task',
    points: [
      'Browse tasks in your LGA',
      'Get paid via OPay or PalmPay',
      'Build a verified work history',
    ],
  },
  {
    id: 'volunteer',
    icon: '🌱',
    title: 'Volunteer',
    description: 'Contribute to climate action and earn a verified certificate and impact score.',
    badge: 'Certificate + impact score',
    points: [
      'Browse tasks in your LGA',
      'Downloadable certificate',
      'Visible impact score on profile',
    ],
  },
  {
    id: 'org',
    icon: '🏢',
    title: 'Organization',
    description: 'Post climate tasks, find verified workers, and report your impact to donors.',
    badge: 'NGO/GOV/CSR',
    points: [
      'Post and manage tasks',
      'Review proof of work',
      'Export donor impact reports',
    ],
  },
];

const LABELS: Record<AccountType, string> = {
  jobseeker: 'a job seeker',
  volunteer: 'a volunteer',
  org: 'an organisation',
};

export default function AccountType() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<AccountType>('jobseeker');

  function handleContinue() {
    navigate('/onboarding/phone', { state: { accountType: selected } });
  }

  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>GET STARTED</p>
      <h1 className={styles.heading}>Who are you signing up as?</h1>
      <p className={styles.sub}>Choose your account type to get started</p>

      <div className={styles.cards}>
        {CARDS.map((card) => (
          <div
            key={card.id}
            className={[
              styles.card,
              selected === card.id ? styles.cardSelected : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setSelected(card.id)}
          >
            <span className={styles.icon}>{card.icon}</span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.description}</p>
            <span className={`${styles.badge} ${styles.badgeGreen}`}>
              {card.badge}
            </span>
            <ul className={styles.points}>
              {card.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button type="button" className={styles.btn} onClick={handleContinue}>
        Continue as {LABELS[selected]}
      </button>
      <p className={styles.loginRow}>
        Already have an account?{' '}
        <a
          href="#"
          className={styles.loginLink}
          onClick={(e) => { e.preventDefault(); navigate('/login'); }}
        >
          Log in
        </a>
      </p>
    </div>
  );
}
