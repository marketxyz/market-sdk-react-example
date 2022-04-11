import { ReactNode, createContext, useCallback, useState, useEffect } from "react";
import { providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

import * as store from "../lib/store";
import { RPCs } from "../config";

export interface WalletAuthContextData {
  provider: providers.Web3Provider | undefined;
  connect: (connector: Connector) => void;
  disconnect: () => void;
  isConnecting: boolean;
};

export const WalletAuthContext = createContext<WalletAuthContextData>({
  provider: undefined,
  connect: (_) => {},
  disconnect: () => {},
  isConnecting: true
});

export enum Connector {
  Metamask = "metamask",
  WalletConnect = "walletconnect"
};

async function connectWallet(connector: Connector){
  let _provider: any;

  if(connector == Connector.Metamask){
    _provider = await detectEthereumProvider();

    await _provider.request({ method: 'eth_requestAccounts' });
  } else {
    const { default: WalletConnectProvider } = await import("@walletconnect/web3-provider");
    _provider = new WalletConnectProvider({ rpc: RPCs });

    await _provider.enable();
  }
  return new providers.Web3Provider(_provider);
}

interface WalletAuthProviderOptions {
  children: ReactNode;
};

export function WalletAuthProvider({ children }: WalletAuthProviderOptions) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [provider, setProvider] = useState<providers.Web3Provider>();

  const disconnect = useCallback(() => {
    setIsConnecting(false);
  }, []);

  const connect = useCallback(async (connector: Connector) => {
    setIsConnecting(true);

    try {
      const provider = await connectWallet(connector);

      store.set("wallet_choice_cache", connector);
      setProvider(provider);
    } catch(error){}

    setIsConnecting(false);
  }, []);

  useEffect(() => {
    const cache = store.get("wallet_choice_cache");

    if(cache != null){
      connect(cache as Connector);
    }
  }, []);

  return (
    <WalletAuthContext.Provider
      value={{
        provider,
        connect,
        disconnect,
        isConnecting
      }}
    >
      {children}
    </WalletAuthContext.Provider>
  );
};
