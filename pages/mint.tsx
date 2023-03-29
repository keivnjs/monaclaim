import { useEffect, useState } from 'react'
import MetamaskButton from 'components/elements/Buttons/Metamask'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image"
import { useMetamask } from 'shared/hooks/useMetamask'
import { classNames } from 'shared/utils/classNames'
import PublicMint from 'components/modules/minting/PublicMint'
import { ERC721Contract } from 'shared/utils/contracts'
import HolderMint from 'components/modules/minting/HolderMint'
import WhitelistMint from 'components/modules/minting/WhitelistMint'
import FreeMint from 'components/modules/minting/FreeMint'
import { Spinner } from 'components/elements/Spinners'
import { currencyFormat } from 'shared/utils/string'

type Priority =
  | "PUBLIC_MINT"
  | "HOLDER"
  | "WHITELIST"
  | "FREE_MINT"

const priorityMap = {
  "PUBLIC_MINT": "Minting Generator",
  "HOLDER": "Holder Mint",
  "WHITELIST": "Whitelist Mint",
  "FREE_MINT": "Free Mint",
}

const Minting: NextPage = () => {
  const { status, accounts, error } = useMetamask();
  const [totalMinted, setTotalMinted] = useState<number>(0)
  const [priority, setPriority] = useState<Priority>("PUBLIC_MINT")
  const [loading, setLoading] = useState<boolean>(false)
  const [isPublic, setPublic] = useState<boolean>(false)

  const getTotalMinted = () => {
    ERC721Contract.methods.totalKnights().call()
      .then(response => {
        const minted = +response
        setTotalMinted(minted)
        // if (minted < 5000) {
        //   setTotalMinted(10000 - minted)
        // } else {
        //   setTotalMinted(minted)
        // }
      })
  }

  const getPriority = async (account: string) => {
    setLoading(true);
    let isStarted: boolean

    await ERC721Contract.methods.started().call()
      .then(response => {
        console.log("started", response)
        isStarted = response
      })

    // Check if holder quantity and holder role are fulfilled
    await ERC721Contract.methods.totalKnightsByHolder().call()
      .then(async (response) => {
        const galapeBalance: number = +response

        if (galapeBalance < 495) {
          await ERC721Contract.methods.isHolder(account).call()
            .then(response => {
              const isHolder: boolean = response[0]
              if (isHolder && isStarted) setPriority("HOLDER")
            })
        }
      })

    await ERC721Contract.methods.whitelisted(account).call()
      .then(response => {
        if (+response > 0 && !isStarted) setPriority("WHITELIST")
      })

    await ERC721Contract.methods.listFreeMint(account).call()
      .then(response => {
        if (+response > 0) setPriority("FREE_MINT")
      })

    setPublic(isStarted)
    setLoading(false);
  }

  useEffect(() => {
    if (status === "READY") {
      // reset to public mint
      setPriority("PUBLIC_MINT");
      // get priority with contract call
      getPriority(accounts[0])
      // get total minted
      getTotalMinted();
    }
  }, [status, accounts[0]])


  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden">
      <Head>
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="Knights Game" key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content="https://knights.game/" key="ogurl" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/coming-soon.png" key="ogimage" />
        <meta property="og:site_name" content="Knights Game" key="ogsitename" />
        <meta property="og:title" content="Minting" key="ogtitle" />
        <meta property="og:description" content="Knights game is a Play to Earn NFT game with a new way of playing, giving players earn $GODL and NFT while playing the game" key="ogdesc" />

        <title>{priorityMap[priority]} | Knights Game</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-x-0 bottom-0 z-10 h-full w-full">
        <div className="relative w-full h-full">
          <Image src="/assets/minting-ground.png" layout="fill" objectFit="cover" />
        </div>
      </div>

      {status !== "READY" && (
        <div className="absolute inset-0 z-20 w-full h-screen bg-white bg-opacity-50" />
      )}

      <div className="relative top-4 mx-auto max-w-xs z-20">
        {status !== "READY" && (
          <div className="h-screen w-full flex flex-col justify-center space-y-4">
            <p className="text-3xl text-center text-blue-900 font-bold">Connect wallet to START</p>
            <div className="relative flex flex-col inset-x-0 justify-center">
              <MetamaskButton />
            </div>
          </div>
        )}

        {status === "READY" && (
          <div>
            {loading
              ? <div className="absolute min-h-screen inset-0 flex items-center justify-center">
                <Spinner className="text-yellow-900 w-16 h-16" />
              </div>
              : <>
                {priority === "PUBLIC_MINT" && <PublicMint />}
                {priority === "HOLDER" && <HolderMint />}
                {priority === "WHITELIST" && <WhitelistMint />}
                {priority === "FREE_MINT" && <FreeMint />}
              </>
            }
          </div>
        )}

        {isPublic && (
          <div className="absolute bottom-10 flex w-full justify-center">
            <p className="text-xs text-white/60">{currencyFormat(totalMinted)} / 10,000</p>
          </div>
        )}
      </div>

      <div className="absolute top-0 flex w-full min-h-screen">
        <div className="speed-slow relative flex w-full">
          <div className={classNames(
            "absolute bottom-0 h-[95vh] w-[300vw] sm:w-[200vw] lg:w-[100vw]",
            "z-[2] left-[0vw]"
          )}>
            <div className="relative h-full w-full">
              <Image src="/assets/cloud.png" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
        <div className="speed-slow relative flex w-full">
          <div className={classNames(
            "absolute bottom-0 h-[95vh] w-[300vw] sm:w-[200vw] lg:w-[100vw]",
            "z-[2] left-[100vw]"
          )}>
            <div className="relative h-full w-full">
              <Image src="/assets/cloud.png" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
        <div className="speed-slow relative flex w-full">
          <div className={classNames(
            "absolute bottom-0 h-[95vh] w-[300vw] sm:w-[200vw] lg:w-[100vw]",
            "z-[2] left-[200vw]"
          )}>
            <div className="relative h-full w-full">
              <Image src="/assets/cloud.png" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 min-h-screen w-full">
        <Image src="/assets/bg-sky.png" layout="fill" />
      </div>
    </div>
  )
}

export default Minting
