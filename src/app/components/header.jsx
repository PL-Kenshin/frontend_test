import Link from 'next/link';
import styles from '../styles/Header.module.scss';

const Header = ({personal}) => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <img src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png" alt="HTML5 Logo" className={styles.logo} />
      </Link>
      <div className={styles.recruitmentInfo}>
        <div className={styles.hoverDiv}>Zadanie <strong>rekrutacyjne</strong><div style={{visibility:`${personal}`}}>Jan Kowalski</div></div>
      </div>
    </header>
  );
};

export default Header;