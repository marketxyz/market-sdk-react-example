import { useContext } from "react";
import Image from "next/image";

import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { WalletAuthContext } from "../../contexts/WalletAuthProvider";
import { ProviderOptions } from "./options";

export interface WalletSelectModalProps {
  open: boolean;
  options: ProviderOptions[];
  onClose?: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
};

export function WalletSelectModal({ options, open, onClose }: WalletSelectModalProps) {
  const { connect } = useContext(WalletAuthContext);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={10}
          variant="outlined"
          component={Box}
        >
          <Grid
            container
            spacing={0}
            width={480}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item xs={12}
              sx={{
                padding: 1,
                textAlign: "center"
              }}
            >
              <Typography
                variant="h5"
                color="text.primary"
              >
                Select Wallet
              </Typography>
            </Grid>

            {options.map((option) => (
              <Grid
                key={option.name}
                sx={{ padding: 2 }}
                container item xs={6}
                onClick={() => connect(option.connector)}
                component={Button}
              >
                <Grid item xs={12}>
                  <Image
                    src={option.icon}
                    width="100px"
                    height="100px"
                    alt={option.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                  >
                    {option.name}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};
