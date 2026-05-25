import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import styles from './Step4Profile.module.css';

const LGAS = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere',
];

const INTERESTS = [
  { id: 'waste_collection', label: 'Waste Collection', icon: '🗑️' },
  { id: 'tree_planting', label: 'Tree Planting', icon: '🌳' },
  { id: 'urban_farming', label: 'Urban Farming', icon: '🌾' },
  { id: 'climate_data', label: 'Climate Data', icon: '📊' },
  { id: 'recycling', label: 'Recycling', icon: '♻️' },
  { id: 'community_education', label: 'Community Education', icon: '📚' },
];

const LGA_MAP: Record<string, string> = {
  'Alimosho': 'alimosho', 'Epe': 'epe', 'Ikorodu': 'ikorodu', 'Mushin': 'mushin',
  'Ibeju-Lekki': 'ibeju-lekki', 'Eti-Osa': 'eti-osa', 'Agege': 'agege',
  'Ajeromi-Ifelodun': 'ajeromi-ifelodun', 'Amuwo-Odofin': 'amuwo-odofin',
  'Apapa': 'apapa', 'Badagry': 'badagry', 'Ifako-Ijaiye': 'ifako-ijaiye',
  'Ikeja': 'ikeja', 'Kosofe': 'kosofe', 'Lagos Island': 'lagos-island',
  'Lagos Mainland': 'lagos-mainland', 'Ojo': 'ojo', 'Oshodi-Isolo': 'oshodi-isolo',
  'Shomolu': 'shomolu', 'Surulere': 'surulere',
};

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
    setInterests(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }

  async function handleContinue() {
    if (!canContinue || loading) return;
    setLoading(true); setError('');
    try {
      await api.setupProfile({
        full_name: name,
        lga: LGA_MAP[lga] || lga.toLowerCase().replace(/\s+/g, '-'),
        task_interests: [...interests],
        role: path === 'volunteer' ? 'volunteer' : 'job_seeker',
      });
      navigate('/onboarding/success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  }

  return (
    <AuthLayout>
      <div className={styles.backRow}>
        <button className={styles.back} onClick={() => navigate(-1)} type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 9H3M8 4L3 9L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back
        </button>
      </div>
      <ProgressBar current={4} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Tell us about yourself</h2>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fullname">Full name</label>
            <input id="fullname" type="text" className={styles.input} placeholder="Enter full name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="lga">Your LGA</label>
            <div className={styles.selectWrap}>
              <select id="lga" className={styles.select} value={lga} onChange={(e) => setLga(e.target.value)}>
                <option value="" disabled>Select your area</option>
                {LGAS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <span className={styles.arrow} aria-hidden="true">▾</span>
            </div>
          </div>
          <div className={styles.interestSection}>
            <p className={styles.interestHeading}>I'm interested in</p>
            <div className={styles.grid}>
              {INTERESTS.map(item => (
                <button key={item.id} type="button"
                  className={`${styles.interestCard} ${interests.has(item.id) ? styles.interestSelected : ''}`}
                  onClick={() => toggleInterest(item.id)} aria-pressed={interests.has(item.id)}>
                  <span className={styles.interestIcon}>{item.icon}</span>
                  <span className={styles.interestName}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="button" onClick={handleContinue} disabled={loading}
          className={`${styles.btn} ${canContinue && !loading ? styles.btnActive : styles.btnMuted}`}>
          {loading ? 'Saving…' : 'Continue'}
        </button>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    </AuthLayout>
  );
}
