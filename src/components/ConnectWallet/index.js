import React, { useContext } from "react";
import { Container, Button, Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import useConnectWallet from "../../hooks/useConnectWallet";
import { TransactionContext } from "../../Context/TransactionContext";
import useChainInfo from "../../hooks/useChainInfo";

const ConnectWallet = () => {
  const [error, connectWallet, disabled, connected, address, balance, network] =
    useConnectWallet();

  const [, , chainId] = useContext(TransactionContext);
  const { currency, chainName } = useChainInfo(chainId);
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <div>
      <Container>
        <Box
          mt={2}
          py={1.7}
          sx={{ backgroundColor: "#E0AFD7", borderRadius: "10px" }}
        >
          <Box component="div" color="red">
            {error}
          </Box>
          <Box py={3}>
            <Button
              disabled={disabled}
              variant="contained"
              component="div"
              color="secondary"
              py={2}
              onClick={() => connectWallet()}
            >
              {connected ? "Connected" : "Connect Wallet"}
            </Button>
            <Box py={2}>
              <Typography variant="body1" color="primary" component="div">
                {isMobile
                  ? address?.slice(0, 7) + "..." + address?.slice(-7)
                  : address}
              </Typography>
            </Box>
            <Typography variant="body1" color="primary" component="div">
              {chainName || network}
            </Typography>
            <Typography variant="h6" component="div" color="initial">
              {balance ? parseFloat(balance).toFixed(4) + " " : "0.0 "}
              {currency}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ConnectWallet;
