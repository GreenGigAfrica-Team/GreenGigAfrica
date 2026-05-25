import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { ALL_TASKS } from '../data/tasks';
import styles from './FindTasks.module.css';

const TASK_TYPES = ['Waste Collection', 'Recycling', 'Community Education'];
const LGA = 'Alimosho LGA';
const LOCATIONS = ['Ikotun', 'Iyana-Ipaja', 'Egbeda', 'Ayoba', 'Alagbado'];

export default function FindTasks() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([...TASK_TYPES]);
  const [selectedLocation, setSelectedLocation] = useState<string>('Iyana-Ipaja');
  const [sortBy, setSortBy] = useState('latest');

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function toggleLocation(loc: string) {
    setSelectedLocation((prev) => (prev === loc ? '' : loc));
  }

  const filtered = useMemo(() => {
    let tasks = ALL_TASKS.filter((t) => selectedTypes.includes(t.type));
    if (selectedLocation) {
      tasks = tasks.filter((t) => t.neighborhood === selectedLocation);
    }
    if (sortBy === 'pay-high') {
      tasks = [...tasks].sort((a, b) => b.pay - a.pay);
    } else if (sortBy === 'spots') {
      tasks = [...tasks].sort((a, b) => b.spotsLeft - a.spotsLeft);
    }
    return tasks;
  }, [selectedTypes, selectedLocation, sortBy]);

  const subtext = selectedLocation ? `${LGA} · ${selectedLocation}` : LGA;

  return (
    <div className={styles.page}>
      <Navbar activePage="find-tasks" />

      <div className={styles.main}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarHeading}>Task Type</h3>
            <div className={styles.checkboxList}>
              {TASK_TYPES.map((type) => (
                <label key={type} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className={styles.checkLabel}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarHeading}>Location</h3>
            <p className={styles.lgaLabel}>{LGA}</p>
            <div className={styles.locationPills}>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`${styles.pill} ${selectedLocation === loc ? styles.pillSelected : ''}`}
                  onClick={() => toggleLocation(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Task list ── */}
        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <h1 className={styles.heading}>Available tasks near you</h1>
              <p className={styles.subtext}>{subtext}</p>
            </div>
            <div className={styles.sortWrap}>
              <span className={styles.sortLabel}>Sort by</span>
              <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="pay-high">Highest Pay</option>
                <option value="spots">Most Spots</option>
              </select>
            </div>
          </div>

          <div className={styles.taskList}>
            {filtered.length > 0 ? (
              filtered.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className={styles.empty}>No tasks match your filters. Try adjusting them.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
