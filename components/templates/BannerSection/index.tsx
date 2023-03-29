import { useState } from "react";
import ModalImage from "components/layouts/Modal";
import CountDownTimer from "components/layouts/Countdown";
import VideoBorderIcon from "components/elements/Icons/VideoBorder";

const BannerSection: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <section
      id="banner"
      className="relative flex items-center w-full font-display"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#081728]/60 via-[#081728]/90 to-[#081728] z-20" />
      <video
        autoPlay
        loop
        muted
        className="z-10 object-cover w-full h-screen"
        poster="/assets/landing-page/video-poster.png"
      >
        <source
          src="https://dnfbzteyqswefjrywktm.supabase.in/storage/v1/object/public/content/War%20Knights%20Game.mp4"
          type="video/mp4"
          className=""
        />
      </video>

      <div className="flex w-full sm:w-5/6 xl:w-1/2 items-center text-center flex-col text-black mx-auto absolute inset-x-0 top-[25%] md:top-[20%] lg:top-[22%] z-20 px-2 sm:px-0">
        <div className="relative">
          <img
            src="/assets/borders/frame1.png"
            className="absolute z-20 hidden w-full h-full sm:block"
          />
          <p className="p-0 sm:px-14 sm:py-12 text-2xl sm:text-[2.75rem] sm:leading-none font-bold sm:font-medium text-yellow-300 text-center uppercase z-30">
            A Kingdom Building Real-time Strategy Game Based on Blockchain
          </p>
        </div>

        <p className="z-30 mt-4 mb-5 text-xl text-center text-white sm:text-2xl sm:mt-9 sm:mb-5">
          Gather troops, build your kingdom, raid enemy’s treasures!
        </p>

        <CountDownTimer className="absolute top-[40%] sm:top-[45%] w-full" />

        <p className="z-30 mt-5 text-2xl text-center text-white sm:text-3xl">
          Download for free!
        </p>
        <div className="flex flex-col justify-center mt-5 space-x-0 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8">
          <button onClick={() => setIsModalVisible(!isModalVisible)}>
            <img src="/assets/icons/AppStore.png" className="mx-auto" />
          </button>
          <button onClick={() => setIsModalVisible(!isModalVisible)}>
            <img src="/assets/icons/GooglePlay.png" className="mx-auto" />
          </button>
        </div>
        <ModalImage
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      </div>
    </section>
  );
};

export default BannerSection;
