import EthSwap from "./EthSwap.json";
let webInstance, walletAddress, contract;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const connectWallethandler = async ({ setConnected, setError }) => {
  try {
    if (!window.ethereum) {
      throw Error("Please install metamask");
    }
    window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() => window.ethereum.request({ method: "eth_requestAccounts" }))
      .then((accounts) => {
        walletAddress = accounts[0];
        setConnected(true);
      });
  } catch (error) {
    setError(error?.message);
  }
};

export const initWeb3 = () => {
  const instance = new window.Web3(window.ethereum);
  webInstance = instance;
};

export async function getAccount() {
  const accounts = await webInstance.eth.getAccounts();
  const balanceInWei = await webInstance.eth.getBalance(accounts[0]);
  const ethBalance = await webInstance.utils.fromWei(balanceInWei);
  return ethBalance;
}

export async function initContract() {
  contract = new webInstance.eth.Contract(EthSwap.abi, contractAddress);
  console.log({ contract });
  return await contract.methods.balanceOf(walletAddress).call();
}

export async function buyToken({ value, setError }) {
  try {
    let ethval = value / 100;
    const weiVal = window.Web3.utils.toWei(ethval?.toString());
    let val = await contract.methods
      .buyTokens()
      .send({ value: weiVal, from: walletAddress });
    console.log("val", val);
  } catch (error) {
    setError(error.message);
  }
}
