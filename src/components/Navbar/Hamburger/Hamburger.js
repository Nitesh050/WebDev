import styles from "./Hamburger.module.css";

export default function Hamburger({ menuOpen, setMenuOpen, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      onClick={() => setMenuOpen(!menuOpen)}
      className={styles.hamburger}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      style={{ pointerEvents: "auto" }}
    >
      ☰
    </button>
  );
}
