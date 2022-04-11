import { Pool, PoolAsset } from "market-sdk";
import { useEffect, useState } from "react";
import { useMarket } from "./useMarket"

const usePoolData = (poolId?: string | number) => {
  const { sdk } = useMarket();

  const [pool, setPool] = useState<Pool>();
  const [assets, setAssets] = useState<PoolAsset[]>();

  useEffect(() => {
    if(!sdk || !poolId){
      return;
    }
    (async () => {
      const pool = await sdk!.poolDirectory.v1!.pools(poolId);
      setPool(pool);

      const assets = await sdk!.lens.v1!.getPoolAssetsWithData(pool.comptroller);
      setAssets(assets);
    })();
  }, [sdk, poolId]);

  return { pool, assets };
};

export { usePoolData };
