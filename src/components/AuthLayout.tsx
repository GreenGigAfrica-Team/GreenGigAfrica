import type { ReactNode } from 'react';
import heroImg from '../assets/images/hero-img.jpg';
import Logo from './Logo';
import styles from './AuthLayout.module.css';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className={styles.shell}>
      <aside className={styles.panel}>
        <img src={heroImg} className={styles.bg} alt="" />
        <div className={styles.overlay} />
        <div className={styles.panelInner}>
          <Logo />
          <div className={styles.tagline}>
            <h1 className={styles.headline}>Real climate work.</h1>
            <h1 className={styles.accentLine}>Real income.</h1>
            <p className={styles.sub}>
              Get paid to do meaningful environmental work right in your
              neighbourhood — no experience needed.
            </p>
          </div>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
