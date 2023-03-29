import WhitepaperIcon from "components/elements/Icons/Whitepaper";
import Image from "next/image";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full py-40 px-4 sm:px-0 font-display"
      style={{
        background: 'url("/assets/bg-about.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-6xl flex mx-auto">
        <div className="flex-col sm:flex-row">
          <div className="flex flex-col sm:flex-row justify-around items-center">
            <div className="w-4/6 sm:w-1/3 flex-col sm:flex-row text-center relative mb-10">
              <img src="/assets/landing-page/about.png" className="w-full" />
            </div>
            <div className="w-full flex-col sm:flex-row sm:w-1/2">
              <div className="relative flex items-center">
                <img
                  src="/assets/borders/border-about.png"
                  className="absolute ml-auto"
                />
                <div className="text-2xl sm:text-3xl text-white font-bold z-10 px-10 lg:px-20">
                  <span>About </span>
                  <span className="text-yellow-300">Knights Game</span>
                </div>
              </div>
              <p className="text-lg text-center sm:text-right text-white mt-10 lg:mt-14 font-sans">
                Knights game is a Play to Earn NFT game with a new way of playing, giving players $GODL and NFT while playing the game. Knights can be staked to earn $GODL, which is used to get other NFT items as well as level up.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-around items-center mt-28">
            <div className="w-full flex-col sm:flex-row sm:w-1/2">
              <div className="relative flex items-center">
                <img
                  src="/assets/borders/border-about.png"
                  className="absolute ml-auto scale-x-[-1]"
                />
                <div className="text-2xl sm:text-3xl text-white font-bold z-10 px-10 lg:px-20">
                  <span>Why </span>
                  <span className="text-yellow-300">Knights Game</span>
                </div>
              </div>
              <p className="text-lg text-center sm:text-left text-white mt-10 lg:mt-14 font-sans">
                The First P2E NFT Game that lets you target rival kingdom in
                wallet address that you want to attack. Your can also form
                alliance with your friends to attack other kingdoms.
              </p>
            </div>
            <div className="sm:w-1/4 flex-col sm:flex-row text-center">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://whitepaper.knights.game/"
                className="flex hover:-translate-y-px"
              >
                <img
                  src="/assets/icons/icon-whitepaper.png"
                  className="mx-auto"
                />
              </a>
              <p className="text-lg text-white mb-8 mt-4">
                Read. Knights Game Whitepaper
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
