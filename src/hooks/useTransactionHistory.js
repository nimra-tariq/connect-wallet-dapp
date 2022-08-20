import { useState, useEffect } from "react";

const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState(() => {
    const transactions = localStorage.getItem("transactions");
    return transactions ? JSON.parse(transactions) : [];
  });

  useEffect(() => {
    if (transactions) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  return [transactions, setTransactions];
};

export default useTransactionHistory;
