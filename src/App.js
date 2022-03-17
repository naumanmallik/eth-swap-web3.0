import * as React from "react";
import styles from "./App.module.css";
import ETHSwap from "./components/ETHSwap";
import { connectWallethandler, initWeb3 } from "./utils/web3";

export default function App() {
  const [connected, setConnected] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.heading}>ETH-SWAP</h1>
        {connected ? (
          <ETHSwap setError={setError} />
        ) : (
          <div className={styles.btnRoot}>
            <button
              onClick={() => connectWallethandler({ setConnected, setError })}
              className={styles.connectbtn}
            >
              Connect with Meta Mask
            </button>
          </div>
        )}
        <div className={styles.errorRoot}>
          <span className={styles.error}>{error}</span>
        </div>
      </div>
    </div>
  );
}
