import { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EditIcon from "@mui/icons-material/Edit";

import { WalletSelectModal } from "./Modal";
import { options } from "./options";
import { useEthers } from "../../hooks/useEthers";
import { shortenAddress } from "../../lib/utils";

export function WalletConnectButton(){
  const { provider, account } = useEthers();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(provider && open){
      setOpen(false);
    }
  }, [provider, open]);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<WalletIcon />}
        endIcon={account && <EditIcon />}
      >
        {account ? shortenAddress(account) : "Connect wallet"}
      </Button>

      <WalletSelectModal
        open={open}
        onClose={() => setOpen(false)}
        options={options}
      />
    </>
  );
};

export default WalletConnectButton;
