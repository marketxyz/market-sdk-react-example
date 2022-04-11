const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

export enum ChainId {
  Polygon = 137,
  Fantom = 250,
};

if(!CHAIN_ID){
  throw new Error("Invalid chain ID. Please check the NEXT_PUBLIC_CHAIN_ID env variable.");
}

export const RPCs: { [key: number]: string } = {
  [ChainId.Fantom]: process.env.NEXT_PUBLIC_RPC_250!,
  [ChainId.Polygon]: process.env.NEXT_PUBLIC_RPC_137!,
};

if(!RPCs[CHAIN_ID]){
  throw new Error("No RPC found for the selected network.");
}

const config = {
  defaultChainId: CHAIN_ID
};

export default config;
