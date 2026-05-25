import { useState } from 'react';
import styles from './PhoneInput.module.css';

export const COUNTRIES = [
  { code: 'NG', dialCode: '+234', flag: '🇳🇬', name: 'Nigeria',       minLen: 10, maxLen: 10 },
  { code: 'ET', dialCode: '+251', flag: '🇪🇹', name: 'Ethiopia',      minLen: 9,  maxLen: 9  },
  { code: 'KE', dialCode: '+254', flag: '🇰🇪', name: 'Kenya',         minLen: 9,  maxLen: 10 },
  { code: 'GH', dialCode: '+233', flag: '🇬🇭', name: 'Ghana',         minLen: 9,  maxLen: 9  },
  { code: 'ZA', dialCode: '+27',  flag: '🇿🇦', name: 'South Africa',  minLen: 9,  maxLen: 9  },
  { code: 'UG', dialCode: '+256', flag: '🇺🇬', name: 'Uganda',        minLen: 9,  maxLen: 9  },
  { code: 'TZ', dialCode: '+255', flag: '🇹🇿', name: 'Tanzania',      minLen: 9,  maxLen: 9  },
  { code: 'RW', dialCode: '+250', flag: '🇷🇼', name: 'Rwanda',        minLen: 9,  maxLen: 9  },
  { code: 'SN', dialCode: '+221', flag: '🇸🇳', name: 'Senegal',       minLen: 9,  maxLen: 9  },
  { code: 'CI', dialCode: '+225', flag: '🇨🇮', name: "Côte d'Ivoire", minLen: 10, maxLen: 10 },
];

export interface PhoneValue {
  dialCode: string;
  digits: string;
  full: string;
  isValid: boolean;
}

interface Props {
  onChange: (value: PhoneValue) => void;
  defaultCountryCode?: string;
  error?: boolean;
  valid?: boolean;
}

function formatDisplay(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export default function PhoneInput({ onChange, defaultCountryCode = 'NG', error = false, valid = false }: Props) {
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [digits, setDigits] = useState('');
  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCountryCode(e.target.value);
    setDigits('');
    const newCountry = COUNTRIES.find((c) => c.code === e.target.value) ?? COUNTRIES[0];
    onChange({ dialCode: newCountry.dialCode, digits: '', full: '', isValid: false });
  }

  function handleDigitsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, country.maxLen);
    setDigits(raw);
    const isValid = raw.length >= country.minLen && raw.length <= country.maxLen;
    onChange({ dialCode: country.dialCode, digits: raw, full: `${country.dialCode}${raw}`, isValid });
  }

  return (
    <div className={[styles.wrap, error ? styles.stateError : '', valid ? styles.stateValid : ''].filter(Boolean).join(' ')}>
      <select className={styles.countrySelect} value={countryCode} onChange={handleCountryChange} aria-label="Country code">
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>{c.flag} {c.dialCode}</option>
        ))}
      </select>
      <input type="tel" inputMode="numeric" className={styles.input}
        placeholder={`${country.minLen}-digit number`}
        value={formatDisplay(digits)} onChange={handleDigitsChange} aria-label="Phone number" />
    </div>
  );
}
