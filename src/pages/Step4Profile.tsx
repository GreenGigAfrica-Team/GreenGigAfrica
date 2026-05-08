import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import { api } from '../api';
import styles from './Step4Profile.module.css';

// Lagos LGAs — primary market for the pilot
const LGAS = [
  'Agege',
  'Ajeromi-Ifelodun',
  'Alimosho',
  'Amuwo-Odofin',
  'Apapa',
  'Badagry',
  'Epe',
  'Eti-Osa',
  'Ibeju-Lekki',
  'Ifako-Ijaiye',
  'Ikeja',
  'Ikorodu',
  'Kosofe',
  'Lagos Island',
  'Lagos Mainland',
  'Mushin',
  'Ojo',
  'Oshodi-Isolo',
  'Shomolu',
  'Surulere',
];

const INTERESTS = [
  { id: 'waste', label: 'Waste Collection', icon: '🗑️' },
  { id: 'trees', label: 'Tree Planting', icon: '🌳' },
  { id: 'farming', label: 'Urban Farming', icon: '🌾' },
  { id: 'climate', label: 'Climate Data', icon: '📊' },
  { id: 'recycling', label: 'Recycling', icon: '♻️' },
  { id: 'education', label: 'Community Education', icon: '📚' },
];

export default function Step4Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, path } = location.state ?? {};

  const [name, setName] = useState('');
  const [lga, setLga] = useState('');
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canContinue = name.trim().length > 0 && lga !== '' && interests.size > 0;

  function toggleInterest(id: string) {
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleContinue() {
    if (!canContinue) return;
    setLoading(true);
    setError('');
    try {
      // Map frontend interest IDs to backend values
      const interestMap: Record<string, string> = {
        waste: 'waste_collection',
        trees: 'tree_planting',
        farming: 'urban_farming',
        climate: 'climate_data',
        recycling: 'recycling',
        education: 'community_education',
      };
      // Map frontend LGA display names to backend accepted values
      const lgaMap: Record<string, string> = {
        'Alimosho': 'alimosho', 'Epe': 'epe', 'Ikorodu': 'ikorodu',
        'Mushin': 'mushin', 'Ibeju-Lekki': 'lekki', 'Eti-Osa': 'lekki',
        'Agege': 'other', 'Ajeromi-Ifelodun': 'other', 'Amuwo-Odofin': 'other',
        'Apapa': 'other', 'Badagry': 'other', 'Ifako-Ijaiye': 'other',
        'Ikeja': 'other', 'Kosofe': 'other', 'Lagos Island': 'other',
        'Lagos Mainland': 'other', 'Ojo': 'other', 'Oshodi-Isolo': 'other',
        'Shomolu': 'other', 'Surulere': 'other',
      };
      const role = path === 'volunteer' ? 'volunteer' : 'job_seeker';
      await api.setupProfile({
        full_name: name,
        lga: lgaMap[lga] || 'other',
        task_interests: [...interests].map(i => interestMap[i] || i),
        role,
      });
      navigate('/onboarding/success', {
        state: { phone, path, name, lga, interests: [...interests] },
      });
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
      <ProgressBar current={4} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Tell us about yourself</h2>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fullname">
              Full name
            </label>
            <input
              id="fullname"
              type="text"
              className={styles.input}
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="lga">
              Your LGA
            </label>
            <div className={styles.selectWrap}>
              <select
                id="lga"
                className={styles.select}
                value={lga}
                onChange={(e) => setLga(e.target.value)}
              >
                <option value="" disabled>
                  Select your area
                </option>
                {LGAS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <span className={styles.arrow} aria-hidden="true">
                ▾
              </span>
            </div>
          </div>
          <div className={styles.interestSection}>
            <p className={styles.interestHeading}>I'm interested in</p>
            <div className={styles.grid}>
              {INTERESTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.interestCard} ${
                    interests.has(item.id) ? styles.interestSelected : ''
                  }`}
                  onClick={() => toggleInterest(item.id)}
                  aria-pressed={interests.has(item.id)}
                >
                  <span className={styles.interestIcon}>{item.icon}</span>
                  <span className={styles.interestName}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className={`${styles.btn} ${canContinue && !loading ? styles.btnActive : styles.btnMuted}`}
        >
          {loading ? 'Saving…' : 'Continue'}
        </button>
        {error && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 8, textAlign: 'center' }}>{error}</p>}
      </div>
    </AuthLayout>
  );
}
