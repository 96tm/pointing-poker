import styles from './footer.module.scss';
import React from 'react';
import logoGithub from '../../../shared/assets/icons/github.svg';
import rssLogo from '../../../shared/assets/icons/rs-school-logo.svg';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src={logoGithub} className={styles.github} alt="logo github" />
        <ul className={styles.team}>
          <li>
            <a
              href="https://github.com/96tm"
              target="_blank"
              rel="noreferrer"
              className={styles.member}
            >
              Viacheslav Smolentsev
            </a>
          </li>
          <li>
            <a
              href="https://github.com/alexandrklychnikov"
              target="_blank"
              rel="noreferrer"
              className={styles.member}
            >
              Aleksandr Klychnikov
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Dasha1801"
              target="_blank"
              rel="noreferrer"
              className={styles.member}
            >
              Darya Belskaya
            </a>
          </li>
        </ul>
      </div>
      <a
        href="https://rs.school/react/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.rssLogo}
      >
        {' '}
        <img src={rssLogo} className={styles.rss} alt="logo rss" />
        <span>&#39;21</span>
      </a>
    </footer>
  );
};

export default Footer;
