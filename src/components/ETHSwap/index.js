import React from "react";
import styles from "../../App.module.css";
import Button from "../Button";
import Input from "../Input";
import { getAccount, initContract } from "../../utils/web3";

export default function ETHSwap() {
  const [isSell, setIsSell] = React.useState(true);
  const [balance, setBalance] = React.useState(0);
  const [token, setToken] = React.useState("");

  const sellHandler = () => {
    setIsSell(true);
  };
  const buyHandler = () => {
    setIsSell(false);
  };

  React.useEffect(() => {
    async function getAccountFn() {
      const balance = await getAccount();
      setBalance(balance);
      const token = await initContract();
      setToken(token);
    }
    getAccountFn();
  }, []);

  return (
    <>
      <div className={styles.buttonRoot}>
        <Button text={"Sell"} clickHandler={sellHandler} />
        <Button text={"Buy"} clickHandler={buyHandler} />
      </div>
      <div className={styles.inputRoot}>
        <Input text="Token" enable={!isSell} />
        <Input text="Eth" enable={isSell} />
      </div>
      <div className={styles.totalText}>
        <span>Total Tokens: {token}</span>
        <span>Total Eth: {balance}</span>
      </div>
    </>
  );
}
