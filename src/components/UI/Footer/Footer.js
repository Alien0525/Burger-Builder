import React from "react";
import styles from "./Footer.module.css";
const footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          <a
            href="https://www.linkedin.com/in/aman-n-s-5b0099193/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Made with <span className={styles.heart}>❤</span> by Aman
          </a>
        </p>
      </div>
    </footer>
  );
};

export default footer;
