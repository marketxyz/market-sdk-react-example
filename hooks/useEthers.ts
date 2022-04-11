import { useContext, useEffect, useState } from "react";
import { WalletAuthContext } from "../contexts/WalletAuthProvider";
import EthereumProvider from "eip1193-provider";

interface PossiblyEmptyNetwork {
  name?: string,
  chainId?: number,
  ensAddress?: string,
  _defaultProvider?: (providers: any, options?: any) => any
};

export function useEthers(){
  const { provider } = useContext(WalletAuthContext);
  const [account, setAccount] = useState<string>();
  const [network, setNetwork] = useState<PossiblyEmptyNetwork>({});

  useEffect(() => {
    if(!provider){
      return;
    }
    const refresh = () => {
      provider.getSigner(0).getAddress().then(setAccount);
      provider.getNetwork().then(network => setNetwork(network));
    };
    refresh();
    
    if(!provider.provider.isMetaMask){
      return;
    }
    const metamask = <EthereumProvider>provider.provider;

    metamask.on("accountsChanged", refresh);
    metamask.on("chainChanged", refresh);

    return () => {
      metamask.removeListener("accountChanged", refresh);
      metamask.removeListener("chainChanged", refresh);
    };
  }, [provider, ]);

  return { provider, account, network };
}
