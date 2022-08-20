import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../Context/TransactionContext";

const useConnectWallet = () => {
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const ethereum = window.ethereum;

  const [, , , setChainId] = useContext(TransactionContext);

  useEffect(() => {
    if (ethereum) {
      ethereum.on("accountsChanged", accountChanged);
      ethereum.on("chainChanged", chainChanged);
    }
  }, [ethereum]);

  useEffect(() => {
    if (!ethereum) {
      setError("Please install MetaMask Chrome Extension");
      setDisabled(true);
    } else connectWallet();
  }, [ethereum]);

  const accountChanged = async (account) => {
    // console.log(account);
    if (account.length === 0) setConnected(false);
    else {
      console.log(account);
      await getAddress(account);
      // setAccount(account); //error full address?.slice(3)
      await getBalance(account);
      await getNetworkName();
    }
  };

  const getBalance = async (newAccount) => {
    try {
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      setError(error);
    }
  };

  const getNetworkName = async () => {
    try {
      //getting current provider name after chain changed
      const provider = new ethers.providers.Web3Provider(ethereum);
      const network = (await provider.getNetwork()).name;
      setNetwork(network);
    } catch (error) {
      console.log("network name not found", error);
    }
  };

  const getAddress = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      return accounts[0];
    } catch (error) {
      console.log(error);
    }
  };

  const chainChanged = async () => {
    await getNetworkName();
    const account = await getAddress();
    await getBalance(account);
    await getChainId();
  };

  const getChainId = async () => {
    const _chainId = await ethereum.request({ method: "eth_chainId" });
    setChainId(_chainId);
  };

  const connectWallet = async () => {
    try {
      const account = await getAddress();
      if (account) {
        setAccount(account);
        setConnected(true);
        await getBalance(account);
        await getNetworkName();
        await getChainId();
      }
    } catch (error) {
      setError("Account not Connected");
      console.log(error);
    }
  };

  return [error, connectWallet, disabled, connected, account, balance, network];
};

export default useConnectWallet;
