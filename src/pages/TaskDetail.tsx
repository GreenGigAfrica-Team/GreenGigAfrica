import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ALL_TASKS } from '../data/tasks';
import styles from './TaskDetail.module.css';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = ALL_TASKS.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className={styles.page}>
        <Navbar activePage="find-tasks" />
        <div className={styles.notFound}>Task not found.</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar activePage="find-tasks" />

      <div className={styles.inner}>
        <button className={styles.back} onClick={() => navigate('/find-tasks')}>
          ← Back to tasks
        </button>

        <div className={styles.columns}>
          {/* ── Left column ── */}
          <div className={styles.left}>
            {/* Header card */}
            <div className={styles.card}>
              <div className={styles.taskHeader}>
                <div className={styles.iconWrap}>
                  <img src={task.icon} alt={task.type} className={styles.iconImg} />
                </div>
                <div className={styles.taskMeta}>
                  <h1 className={styles.taskTitle}>{task.title}</h1>
                  <div className={styles.tags}>
                    <span className={styles.typeTag}>{task.type}</span>
                    <span className={styles.orgTag}>{task.org}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info card */}
            <div className={styles.card}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 7 3.5a1.5 1.5 0 0 1 0 3z" fill="var(--color-primary)"/>
                    </svg>
                    Location
                  </span>
                  <span className={styles.infoValue}>{task.location}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="2" width="12" height="11" rx="2" stroke="var(--color-primary)" strokeWidth="1.4" fill="none"/>
                      <path d="M1 5h12" stroke="var(--color-primary)" strokeWidth="1.4"/>
                      <path d="M4 1v2M10 1v2" stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    Date &amp; Time
                  </span>
                  <span className={styles.infoValue}>{task.date} · {task.time}</span>
                </div>
                <div className={`${styles.infoItem} ${styles.infoItemFull}`}>
                  <span className={styles.infoLabel}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="5" cy="4" r="2" stroke="var(--color-primary)" strokeWidth="1.4" fill="none"/>
                      <circle cx="9.5" cy="4" r="2" stroke="var(--color-primary)" strokeWidth="1.4" fill="none"/>
                      <path d="M1 12c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                      <path d="M9.5 8c1.93 0 3.5 1.57 3.5 3.5" stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                    </svg>
                    Workers Needed
                  </span>
                  <span className={styles.infoValue}>{task.totalSpots} total · {task.spotsLeft} spots remaining</span>
                </div>
              </div>
            </div>

            {/* Task details */}
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Task Details</h2>
              <p className={styles.description}>{task.description}</p>
            </div>

            {/* Proof of work */}
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Proof of Work</h2>
              <p className={styles.proofIntro}>
                You will need to submit the following to confirm task completion:
              </p>
              <ol className={styles.proofList}>
                {task.proofOfWork.map((item, i) => (
                  <li key={i} className={styles.proofItem}>
                    <span className={styles.proofNum}>{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className={styles.right}>
            <div className={styles.card}>
              <p className={styles.payLabel}>Pay</p>
              <p className={styles.payAmount}>₦{task.pay.toLocaleString()}</p>
              <hr className={styles.divider} />
              <div className={styles.spotsBadge}>
                <span className={styles.spotsText}>{task.spotsLeft} spots left</span>
              </div>
              <button className={styles.acceptBtn}>Accept task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
