import { MarketSDK } from "market-sdk";
import { useEffect, useState } from "react";
import Web3 from "web3";

import { useEthers } from "./useEthers";

export type MarketData = {
  sdk?: MarketSDK
};

const useMarket = (): MarketData => {
  const { provider } = useEthers();
  const [sdk, setSDK] = useState<MarketSDK>();


  useEffect(() => {
    if(provider){
      // @ts-ignore
      const sdk = new MarketSDK(new Web3(provider.provider));

      sdk.init().then(() => setSDK(sdk));
    }
  }, [provider]);

  return { sdk };
};

export { useMarket };