import AboutSection from "components/templates/AboutSection";
import GameplaySection from "components/templates/GameplaySection";
import Navbar from "components/templates/Navbar";
import TroopsInfoSection from "components/templates/TroopsInfoSection";
import BannerSection from "components/templates/BannerSection";
import RoadmapSection from "./RoadmapSection";
import HiringSection from "./HiringSection";
import TeamSection from "./TeamSection";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { classNames } from "shared/utils/classNames";
import FAQSection from "./FAQSection";
import Footer from "./Footer";

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="Knights Game" key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content="https://knights.game/" key="ogurl" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/assets/landing-page/video-poster.png"
          key="ogimage"
        />
        <meta property="og:site_name" content="Knights Game" key="ogsitename" />
        <meta property="og:title" content="Knights Game NFT" key="ogtitle" />
        <meta
          property="og:description"
          content="Knights game is a Play to Earn NFT game with a new way of playing, giving players earn $GODL and NFT while playing the game"
          key="ogdesc"
        />

        <title>Knights Game</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <main className="w-full bg-slate-900 mx-auto overflow-hidden">
        <Navbar />
        <BannerSection />
        <AboutSection />
        <TroopsInfoSection />
        <GameplaySection />
        <RoadmapSection />
        <HiringSection />
        <TeamSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
