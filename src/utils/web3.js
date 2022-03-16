import EthSwap from "./EthSwap.json";
let webInstance,
  walletAddress,
  contractAddress = "0x7ED1Ead2a3C38fF4804B85999FC2C50c41d5Fd3c";

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
      .then((account) => {
        walletAddress = account[0];
        setConnected(true);
      });
  } catch (error) {
    setError(error?.message);
  }
};

export const initWeb3 = () => {
  let instance = new window.Web3(window.ethereum);
  webInstance = instance;
};

export async function getAccount() {
  let accounts = await webInstance.eth.getAccounts();
  let balanceInWei = await webInstance.eth.getBalance(accounts[0]);
  const ethBalance =  await webInstance.utils.fromWei(balanceInWei);
  return ethBalance;
}

export async function initContract() {
  let contract = new webInstance.eth.Contract(EthSwap.abi, contractAddress);
  return await contract.methods.balanceOf(walletAddress).call();
}
