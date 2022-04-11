import { Typography } from '@mui/material'
import { Pool } from 'market-sdk'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import WalletConnectButton from '../components/WalletSelector/Button'

import { useEthers } from '../hooks/useEthers'
import { useMarket } from '../hooks/useMarket'

import styles from '../styles/Home.module.css'

function Home(){
  const { network } = useEthers();
  const { sdk } = useMarket();

  const [pools, setPools] = useState<Pool[]>();

  useEffect(() => {
    if(!sdk){
      return;
    }
    sdk?.poolDirectory.v1!.getAllPools().then(setPools);
  }, [sdk]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h3">
          Market SDK React Example
        </Typography>

        <WalletConnectButton />

        <Typography variant="body1">
          Selected network: {network.chainId}
        </Typography>
        
        <Typography variant="h4">
          Pools
        </Typography>

        <pre>
          {
            pools && JSON.stringify(pools.map(pool => ({
              comptroller: pool.comptroller.address,
              name: pool.name,
              creator: pool.creator,
              blockPosted: pool.blockPosted.toString(),
              timestampPosted: pool.timestampPosted.toString(),
            })), undefined, 4)
          }
        </pre>
      </main>

      <footer className={styles.footer}>
        Copyright © market.xyz
      </footer>
    </div>
  )
}

export default Home;
