import styles from './ProgressBar.module.css';

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bars} role="progressbar" aria-valuenow={current} aria-valuemax={total}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className={`${styles.bar} ${i < current ? styles.filled : ''}`} />
        ))}
      </div>
      <span className={styles.label}>
        STEP {current} of {total}
      </span>
    </div>
  );
}
