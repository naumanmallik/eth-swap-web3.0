import EthSwap from "./EthSwap.json";
import TokenABI from "./TokenABI.json";
let webInstance, walletAddress, ethSwapContract, tokenContract;
const { REACT_APP_ETHSWAP_CONTRACT_ADDRESS, REACT_APP_TOKEN_CONTRACT_ADDRESS } =
  process.env;

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
  ethSwapContract = new webInstance.eth.Contract(
    EthSwap.abi,
    REACT_APP_ETHSWAP_CONTRACT_ADDRESS
  );

  console.log({ ethSwapContract });

  tokenContract = new webInstance.eth.Contract(
    TokenABI.abi,
    REACT_APP_TOKEN_CONTRACT_ADDRESS
  );

  console.log({ tokenContract });

  return await tokenContract.methods.balanceOf(walletAddress).call();
}

export async function buyToken({ value }) {
  if (!value) {
    alert("Please input token value");
    return;
  }
  const weiVal = webInstance.utils.toWei(value?.toString());
  let val = await ethSwapContract.methods
    .buyTokens()
    .send({ value: weiVal, from: walletAddress });
  console.log("val", val);
}

export async function sellToken({ value }) {
  if (!value) {
    alert("Please input Eth value");
    return;
  }
  const weiVal = webInstance.utils.toWei(value?.toString());
  const tokenConfitmation = await tokenContract.methods
    .approve(ethSwapContract._address, weiVal)
    .send({ from: walletAddress });
  if (tokenConfitmation?.status) {
    let val = await ethSwapContract.methods
      .sellTokens(weiVal)
      .send({ from: walletAddress });
    console.log("val sell token: ", val);
  }
}
