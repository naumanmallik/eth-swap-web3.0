import React from "react";
import styles from "./Input.module.css";

export default function Input({ text, handleChange, setter, value, enable }) {
  return (
    <div className={styles.container}>
      <span className={styles.txt}>{text}</span>
      <input
        disabled={enable}
        className={styles.input}
        placeholder={text}
        type={"text"}
        value={value}
        onChange={handleChange(setter)}
      />
    </div>
  );
}
