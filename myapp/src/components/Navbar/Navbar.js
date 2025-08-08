import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Hamburger from "./Hamburger/Hamburger";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      menuRef.current.style.display = "block";

      gsap.to(menuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        itemsRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          menuRef.current.style.display = "none";
        },
      });
    }
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} buttonRef={buttonRef} />

      <div
        ref={menuRef}
        onClick={() => setMenuOpen(false)}
        className={styles.menu}
      >
        {["Home", "About", "Services", "Contact"].map((item, index) => (
          <p
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={styles.menuItem}
          >
            {item}
          </p>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
