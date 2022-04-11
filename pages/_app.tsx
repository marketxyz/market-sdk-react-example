import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { WalletAuthProvider } from "../contexts/WalletAuthProvider";

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  const theme = createTheme();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Market SDK React Example</title>
      </Head>

      <ThemeProvider theme={theme}>
        <WalletAuthProvider>
          <Component {...pageProps} />
        </WalletAuthProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
