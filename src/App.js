import * as React from "react";
import styles from "./App.module.css";
import Button from "./components/Button";
import Input from "./components/Input";

export default function App() {
  const [isSell, setIsSell] = React.useState(true);
  const sellHandler = () => {
    setIsSell(true);
  };
  const buyHandler = () => {
    setIsSell(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.heading}>ETH-SWAP</h1>
        <div className={styles.buttonRoot}>
          <Button text={"Sell"} clickHandler={sellHandler} />
          <Button text={"Buy"} clickHandler={buyHandler} />
        </div>
        <div className={styles.inputRoot}>
          <Input text="Token" enable={!isSell} />
          <Input text="Eth" enable={isSell} />
        </div>
        <div className={styles.totalText}>
          <span>Total Tokens: 12</span>
          <span>Total Eth: 21</span>
        </div>
      </div>
    </div>
  );
}
