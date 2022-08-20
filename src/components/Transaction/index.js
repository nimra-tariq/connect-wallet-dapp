import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import useChainInfo from "../../hooks/useChainInfo";

const Transaction = ({ transactionHash, amount, status, chainId }) => {
  const { currency, url, chainName } = useChainInfo(chainId);
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Grid container>
        <Box p={3} my={4} sx={{ backgroundColor: "#694D80" }}>
          <Grid item xs={12}>
            <Box py={3}>
              <Typography variant="body1" color="#00AA80">
                {isMobile
                  ? transactionHash.slice(0, 8) +
                    "..." +
                    transactionHash.slice(-8)
                  : transactionHash}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="body1" color="white">
                Balance: {`${amount} ${currency}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Link
              href={`${url}${transactionHash}`}
              color="inherit"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <Box mt={2}>
                <Button variant="contained">View on Explorer</Button>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Box py={3}>
              <Typography variant="body1" color="#DFFF00">
                {chainName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="body1" color="initial">
                {status.toUpperCase()}
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default Transaction;
