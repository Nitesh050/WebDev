import styles from './Footer.module.css';
import socialLinks from '../../data/socialLinks.json'; 

function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <span className={styles.icon}>{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Nitesh Kumar Pandey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
