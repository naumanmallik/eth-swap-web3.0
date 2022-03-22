import React from "react";
import styles from "../../App.module.css";
import Button from "../Button";
import Input from "../Input";
import {
  getAccount,
  initContract,
  buyToken,
  sellToken,
} from "../../utils/web3";

export default function ETHSwap({ setError }) {
  const [isSell, setIsSell] = React.useState(true);
  const [balance, setBalance] = React.useState(0);
  const [token, setToken] = React.useState("");
  const [tokenVal, setTokenVal] = React.useState("");
  const [ethVal, setEthVal] = React.useState("");

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const sellHandler = () => {
    setIsSell(true);
    setEthVal("");
  };

  const buyHandler = () => {
    setIsSell(false);
    setTokenVal("");
  };

  React.useEffect(() => {
    async function getAccountFn() {
      try {
        const balance = await getAccount();
        setBalance(balance);
        const token = await initContract();
        setToken(token);
      } catch (error) {
        setError(error?.message);
      }
    }
    getAccountFn();
  }, [setError]);

  const handleEhtWap = async () => {
    try {
      if (isSell) {
        await sellToken({ value: tokenVal, setError });
      } else {
        await buyToken({ value: ethVal, setError });
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <>
      <div className={styles.buttonRoot}>
        <Button text={"Sell"} clickHandler={sellHandler} />
        <Button text={"Buy"} clickHandler={buyHandler} />
      </div>
      <div className={styles.inputRoot}>
        <Input
          text="Token"
          handleChange={handleChange}
          setter={setTokenVal}
          value={tokenVal}
          enable={!isSell}
        />
        <Input
          text="Eth"
          handleChange={handleChange}
          setter={setEthVal}
          value={ethVal}
          enable={isSell}
        />
      </div>
      <div className={styles.convertBtnRoot}>
        <button
          type="button"
          className={styles.convertBtn}
          onClick={handleEhtWap}
        >
          Convert
        </button>
      </div>
      <div className={styles.totalText}>
        <span>Total Tokens: {token}</span>
        <span>Total Eth: {balance}</span>
      </div>
    </>
  );
}
