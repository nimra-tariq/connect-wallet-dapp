import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { TransactionContext } from "../../Context/TransactionContext";
import useChainInfo from "../../hooks/useChainInfo";
import useSendTransaction from "../../hooks/useSendTransaction";

const SendTransaction = () => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const { sendTransaction, transactionError, status, setStatus } =
    useSendTransaction(receiver, amount, setReceiver, setAmount);

  const [, , chainId] = useContext(TransactionContext);
  const { currency } = useChainInfo(chainId);

  const handleSendTransaction = async (e) => {
    e.preventDefault();
    console.log("called");
    await sendTransaction();
  };

  return (
    <Container>
      <Box
        mt={3}
        sx={{ backgroundColor: "#E0AFD7", borderRadius: "5px" }}
        p={1}
      >
        <Box>
          <Box component="div" color="red">
            {transactionError}
          </Box>
          <Typography variant="h6" component="div" color="initial">
            Send Amount
          </Typography>
          <form onSubmit={handleSendTransaction}>
            <TextField
              required
              id="receiver"
              component="div"
              variant="outlined"
              label="Receiver Address"
              value={receiver}
              onChange={(e) => {
                setReceiver(e.target.value);
                setStatus("send");
              }}
              sx={{ paddingBottom: "10px" }}
              fullWidth
            />
            <TextField
              required
              id="amount"
              component="div"
              variant="outlined"
              label={`Amount in  ${currency}`}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setStatus("send");
              }}
              sx={{ paddingBottom: "10px" }}
              fullWidth
            />
            <Button
              disabled={status === "send" ? false : true}
              variant="contained"
              fullWidth
              color="secondary"
              type="submit"
            >
              {`${status} ${currency}`}
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default SendTransaction;
