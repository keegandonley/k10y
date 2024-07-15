import { merge } from '@/util/classNames';
import styles from './footer.module.css';
import Link from 'next/link';
import { Avatar } from '../Avatar';
import { TotalViews } from '../TotalViews';
import { CountryViews } from '../CountryViews';

interface FooterProps {
  className?: string;
  children?: any;
}

export const Footer = ({ className, children }: FooterProps) => {
  return (
    <footer className={merge(styles.footer, className)}>
      <div className={styles.content}>
        <div className={styles.column}>
          <strong>Keegan Donley</strong>
          <Link href="/blog">Blog</Link>
          <Link href="/library">Reading List</Link>
          <Link href="/resume">Resume</Link>
          <br />
        </div>
        <div className={styles.column}>{children}</div>
        <div className={styles.column}>
          <div className={styles.avatar}>
            <Avatar width={50} />
          </div>
          <span className={styles.totalViews}>
            <TotalViews /> total blog post views (and counting!)
          </span>
          <CountryViews />
        </div>
      </div>
      <div className={styles.copyright}>&copy; 2024 by Keegan Donley</div>
    </footer>
  );
};
