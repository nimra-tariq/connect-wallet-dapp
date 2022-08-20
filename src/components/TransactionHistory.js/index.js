import React, { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { TransactionContext } from "../../Context/TransactionContext";
import Transaction from "../Transaction";

const TransactionHistory = () => {
  const [transactions] = useContext(TransactionContext);

  return (
    <>
      <Box>
        <Box py={3}>
          <Typography
            variant="h6"
            textAlign="center"
            color="#108080"
            fontWeight="bold"
            fontSize="2rem"
          >
            Transaction History
          </Typography>
        </Box>
        <Grid>
          {transactions.length > 0 ? (
            transactions.map(
              ({ transactionHash, amount, status, chainId }, index) => (
                <Box key={index}>
                  <Transaction
                    transactionHash={transactionHash}
                    amount={amount}
                    status={status}
                    chainId={chainId}
                  ></Transaction>
                </Box>
              )
            )
          ) : (
            <Typography variant="body1" color="initial">
              No transaction History found
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default TransactionHistory;
