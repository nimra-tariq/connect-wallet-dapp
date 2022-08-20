import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { TransactionContext } from "../Context/TransactionContext";

const useSendTransaction = (receiver, amount, setReceiver, setAmount) => {
  const ethereum = window.ethereum;
  useEffect(() => {
    if (ethereum) {
      ethereum.on("chainChanged", () => {
        setAmount("");
        setReceiver("");
      });
    }
  }, [setAmount, ethereum, setReceiver]);

  const [transactions, setTransactions, chainId] =
    useContext(TransactionContext);

  const [transactionError, setTransactionError] = useState("");
  const [status, setStatus] = useState("send");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const sendTransaction = async () => {
    try {
      setStatus("processing...");
      const tx = await signer.sendTransaction(
        {
          to: receiver,
          value: ethers.utils.parseEther(amount),
        },
        signer
      );
      console.log(tx);
      setStatus("pending...");
      const { transactionHash } = await tx.wait();
      setStatus("confirmed");
      setTransactions([
        ...transactions,
        { transactionHash, amount, status: "confirmed", chainId },
      ]);
      toast.success("✔ Transaction Confirmed");
      setStatus("send");
    } catch (error) {
      console.log(error, "transaction error");
      setTransactionError(error.message);
      toast.error("❌ Transaction failed");
      setStatus("send");
    }
  };

  return { sendTransaction, transactionError, status, setStatus };
};

export default useSendTransaction;
