import { useNavigate } from 'react-router-dom';
import logoSrc from '../assets/logo2.PNG';
import styles from './Navbar.module.css';

interface Props {
  activePage: 'find-tasks' | 'my-tasks';
}

export default function Navbar({ activePage }: Props) {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img src={logoSrc} alt="GreenGig Africa" className={styles.logo} />
      </div>

      <div className={styles.center}>
        <button
          type="button"
          className={`${styles.navLink} ${activePage === 'find-tasks' ? styles.active : styles.inactive}`}
          onClick={() => navigate('/find-tasks')}
        >
          Find Tasks
        </button>
        <button
          type="button"
          className={`${styles.navLink} ${activePage === 'my-tasks' ? styles.active : styles.inactive}`}
          onClick={() => navigate('/my-tasks')}
        >
          My Tasks
        </button>
      </div>

      <div className={styles.right}>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button type="button" className={styles.avatar} aria-label="Profile">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
