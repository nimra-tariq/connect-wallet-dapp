import "./App.css";
import { Grid, Container, Typography } from "@mui/material";
import ConnectWallet from "./components/ConnectWallet";
import SendTransaction from "./components/SendTransaction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionHistory from "./components/TransactionHistory.js";
import { TransactionContext } from "./Context/TransactionContext";
import useTransactionHistory from "./hooks/useTransactionHistory";
import { useState } from "react";

function App() {
  const [chainId, setChainId] = useState("");
  const [transactions, setTransactions] = useTransactionHistory();
  return (
    <div className="App">
      <TransactionContext.Provider
        value={[transactions, setTransactions, chainId, setChainId]}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" color="initial">
            Connect Wallet Dapp
          </Typography>
          <div>
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              wrap="wrap"
            >
              <Grid item sm={6}>
                <ConnectWallet />
              </Grid>
              <Grid item sm={6}>
                <SendTransaction />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              wrap="wrap"
            >
              <Grid item sm={6}>
                <TransactionHistory></TransactionHistory>
              </Grid>
            </Grid>
          </div>
        </Container>
        <ToastContainer />
      </TransactionContext.Provider>
    </div>
  );
}

export default App;
