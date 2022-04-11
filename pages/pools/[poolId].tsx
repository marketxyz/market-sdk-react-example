import { Button, Paper, TextField, Typography } from "@mui/material";
import { CToken } from "market-sdk";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEthers } from "../../hooks/useEthers";
import { useMarket } from "../../hooks/useMarket";
import { usePoolData } from "../../hooks/usePoolData";

function PoolPage(){
  const router = useRouter();
  const poolId  = router.query.poolId?.toString();
  
  const { account } = useEthers();
  const { sdk } = useMarket();
  const { pool, assets } = usePoolData(poolId);

  const [depositAmount, setDepositAmount] = useState<string>();
  const [withdrawAmount, setWithdrawAmount] = useState<string>();

  return (
    <>
      { pool ? (
        <Paper sx={{ padding: 2, margin: 2 }}>
          <Typography variant="h6">{pool.name}</Typography>
          <Typography variant="body1">Creator: {pool.creator}</Typography>
          <Typography variant="body1">Comptroller: {pool.comptroller.address}</Typography>
        </Paper> ) :
        <Typography variant="body1"> Loading...</Typography>
      }
      {
        assets ? (
          <Paper sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h6">Assets</Typography>
            {
              assets.map((asset, i) => (
                <Paper sx={{ padding: 2, margin: 2 }} key={i}>
                  <Typography variant="body1">{asset.underlyingName}</Typography>
                  <Typography variant="body1">Borrow Balance: {asset.borrowBalance.toString()}</Typography>
                  <Typography variant="body1">Supply Balance: {asset.supplyBalance.toString()}</Typography>
                  <Typography variant="body1">Liquidity: {asset.liquidity.toString()}</Typography>

                  <br/>

                  <TextField
                    size="small" placeholder="Enter deposit amount" type="number" 
                    onChange={e => setDepositAmount(e.target.value)}
                  />
                  
                  <Button 
                    variant="contained" size="small" 
                    onClick={async () => {
                      // kind of a hack since CToken also implements IERC20. Please don't use this in production.
                      await new CToken(sdk!, asset.underlyingToken).approve(asset.cToken.address, depositAmount!, { from: account });
                      await asset.cToken.mint(depositAmount!, { from: account });
                    }}>
                    Deposit
                  </Button>

                  <TextField
                    size="small" placeholder="Enter withdraw amount" type="number"
                    onChange={e => setWithdrawAmount(e.target.value)} 
                    sx={{ marginLeft: 2 }}
                  />
                  
                  <Button
                    variant="contained" size="small"
                    onClick={() => {
                      asset.cToken.redeemUnderlying(withdrawAmount!, { from: account });
                    }}>
                      Withdraw
                    </Button>

                  <br/><br/>
                  {
                    asset.membership ? 
                      <Button 
                        variant="contained" size="small"
                        onClick={() => {
                         pool?.comptroller.exitMarket(asset.cToken.address, { from: account })
                        }}>
                          Remove from collateral 
                      </Button> :

                      <Button
                        variant="contained" size="small"
                        onClick={() => {
                          pool?.comptroller.enterMarkets([asset.cToken], { from: account });
                        }}> 
                          Set as collateral
                      </Button>
                  }
                </Paper>
              ))
            }
          </Paper>
        ) : 
        <Typography> Loading...</Typography>
      }
    </>
  );
}

export default PoolPage;