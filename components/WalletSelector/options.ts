import { ImageProps } from "next/image";
import { Connector } from "../../contexts/WalletAuthProvider";
import MetamaskIcon from "../../icons/Metamask.svg";
import WalletConnectIcon from "../../icons/WalletConnect.svg";

export interface ProviderOptions {
  name: string,
  icon: ImageProps["src"],
  connector: Connector,
  description?: string,
};

export const options: ProviderOptions[] = [
  {
    connector: Connector.Metamask,
    name: "Metamask",
    icon: MetamaskIcon,
    description: "Easy-to-use browser extension."
  },
  {
    connector: Connector.WalletConnect,
    name: "Wallet Connect",
    icon: WalletConnectIcon,
    description: "Connect to Trust Wallet, Rainbow Wallet and more..."
  },
];
