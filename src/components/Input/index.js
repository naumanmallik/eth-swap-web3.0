import React from "react";
import styles from "./Input.module.css";

export default function Input({ text, enable }) {
  return (
    <div className={styles.container}>
      <span className={styles.txt}>{text}</span>
      <input
        disabled={enable}
        className={styles.input}
        placeholder={text}
        type={"text"}
      />
    </div>
  );
}
