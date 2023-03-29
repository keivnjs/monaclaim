import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image"
import { classNames } from 'shared/utils/classNames'

const Upcoming: NextPage = () => {
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
        <meta property="og:title" content="Coming Soon" key="ogtitle" />
        <meta property="og:description" content="Knights game is a Play to Earn NFT game with a new way of playing, giving players earn $GODL and NFT while playing the game" key="ogdesc" />

        <title>Knights Game</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-x-0 bottom-0 z-10 h-5/6 sm:h-full">
        <div className="relative w-full h-full">
          <Image src="/assets/townsmen.gif" layout="fill" objectFit="cover" />
        </div>
      </div>

      <div className="absolute bottom-[60vh] sm:bottom-[70vh] w-full">
        <img src="/assets/coming-soon.png" className="up-down relative z-10 h-28 sm:h-44 mx-auto" />
      </div>

      <div className="flex w-[100vh]">
        <div className="speed-fast relative flex w-full">
          <div className={classNames(
            "absolute top-0 mt-32 sm:mt-14 w-[840px] sm:w-full",
            "z-[2] left-[0vh]"
          )}>
            <div className="relative top-0 min-h-screen w-full">
              <Image src="/assets/bg-clouds.png" layout="fill" />
            </div>
          </div>
          <div className={classNames(
            "absolute top-0 mt-32 sm:mt-14 w-[840px] sm:w-full",
            "z-[1] scale-[.7] left-[100vh]"
          )}>
            <div className="relative top-0 min-h-screen">
              <Image src="/assets/bg-clouds.png" layout="fill" />
            </div>
          </div>
          <div className={classNames(
            "absolute top-0 mt-32 sm:mt-14 w-[840px] sm:w-full",
            "z-[1] scale-[.9] left-[200vh]"
          )}>
            <div className="relative top-0 min-h-screen w-full">
              <Image src="/assets/bg-clouds.png" layout="fill" />
            </div>
          </div>
        </div>

        <div className="speed-fast relative flex w-full left-[500vh]">
          <div className={classNames(
            "absolute top-0 mt-32 sm:mt-14 w-[840px] sm:w-full",
            "z-[2] left-[0vh]"
          )}>
            <div className="relative top-0 min-h-screen w-full">
              <Image src="/assets/bg-clouds.png" layout="fill" />
            </div>
          </div>
          <div className={classNames(
            "absolute top-0 mt-32 sm:mt-14 w-[840px] sm:w-full",
            "z-[1] scale-[.7] left-[100vh]"
          )}>
            <div className="relative top-0 min-h-screen">
              <Image src="/assets/bg-clouds.png" layout="fill" />
            </div>
          </div>
          <div className={classNames(
            "absolute top-0 mt-32 sm:mt-14 w-[840px] sm:w-full",
            "z-[1] scale-[.9] left-[200vh]"
          )}>
            <div className="relative top-0 min-h-screen w-full">
              <Image src="/assets/bg-clouds.png" layout="fill" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute flex top-0 w-full z-10">
        <div className="flex space-x-4 mx-auto text-green-900 px-2 py-3">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/KnightsGameNFT"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12" >
              <Image src="/assets/icons/icon-twitter.png" layout="fill" />
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="http://discord.gg/knightsgame"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12" >
              <Image src="/assets/icons/icon-discord.png" layout="fill" />
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/knightsgamenft/"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12" >
              <Image src="/assets/icons/icon-instagram.png" layout="fill" />
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://whitepaper.knights.game/"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12" >
              <Image src="/assets/icons/icon-whitepaper.png" layout="fill" />
            </div>
          </a>
        </div>
      </div>

      <div className="fixed inset-0 min-h-screen w-full">
        <Image src="/assets/bg-sky.png" layout="fill" />
      </div>
    </div>
  )
}

export default Upcoming
