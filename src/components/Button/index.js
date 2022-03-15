import React from "react";
import styles from "./Button.module.css";

export default function Button({ text, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className={`${styles.btn} ${text === "Sell" ? styles.sell : styles.buy}`}
    >
      {text}
    </button>
  );
}
