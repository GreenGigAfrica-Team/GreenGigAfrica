import { useNavigate } from 'react-router-dom';
import type { Task } from '../data/tasks';
import styles from './TaskCard.module.css';

export type { Task };

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/tasks/${task.id}`)}>
      <div className={styles.cardLeft}>
        <div className={styles.iconWrap}>
          <img src={task.icon} alt={task.type} className={styles.iconImg} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{task.title}</h3>
          <p className={styles.meta}>
            {task.location}&nbsp;&bull;&nbsp;{task.date}&nbsp;&bull;&nbsp;{task.time}
          </p>
          <div className={styles.tags}>
            <span className={styles.typeTag}>{task.type}</span>
            <span className={styles.orgTag}>{task.org}</span>
          </div>
        </div>
      </div>
      <div className={styles.cardRight}>
        <span className={styles.spotsBadge}>{task.spotsLeft} spots left</span>
        <span className={styles.pay}>₦{task.pay.toLocaleString()}</span>
      </div>
    </div>
  );
}
