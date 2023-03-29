import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="w-full">
      <div className="flex flex-col items-center justify-around mx-auto mb-10 space-x-0 space-y-10 max-w-7xl sm:flex-row sm:space-x-14 sm:space-y-0">
        <div className="flex space-x-10">
          <img className="w-full sm:w-20" src="/assets/icons/icon-game.png" />
          <div className="flex flex-col justify-around w-full my-0 space-x-0 space-y-2 sm:flex-row sm:space-x-14 sm:space-y-0 sm:my-auto">
            <a
              href="#troops"
              className="font-semibold text-white transition duration-300 hover:text-yellow-500 focus:text-yellow-500"
            >
              Troops
            </a>
            <a
              href="#gameplay"
              className="font-semibold text-white transition duration-300 hover:text-yellow-500 focus:text-yellow-500"
            >
              Gameplay
            </a>
            <a
              href="#roadmap"
              className="font-semibold text-white transition duration-300 hover:text-yellow-500 focus:text-yellow-500"
            >
              Roadmap
            </a>
            <a
              href="#team"
              className="font-semibold text-white transition duration-300 hover:text-yellow-500 focus:text-yellow-500"
            >
              Team
            </a>
          </div>
        </div>
        <div className="flex mx-auto space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/KnightsGameNFT"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12">
              <Image src="/assets/icons/icon-twitter.png" layout="fill" />
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="http://discord.gg/knightsgame"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12">
              <Image src="/assets/icons/icon-discord.png" layout="fill" />
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/knightsgamenft/"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12">
              <Image src="/assets/icons/icon-instagram.png" layout="fill" />
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://whitepaper.knights.game/"
            className="flex items-center space-x-2 hover:-translate-y-px"
          >
            <div className="relative w-12 h-12">
              <Image src="/assets/icons/icon-whitepaper.png" layout="fill" />
            </div>
          </a>
        </div>
      </div>
      <div className="relative">
        <p className="absolute left-0 text-base text-center text-white transform inset-x-1 sm:left-1/2 bottom-2 sm:bottom-0 -translate-x-0 sm:-translate-x-1/2 -translate-y-0 sm:-translate-y-1/2">
          Copyright 2021 © Knights.game
        </p>
        <img src="/assets/bg-footer.png" className="w-full h-20" />
      </div>
    </footer>
  );
};

export default Footer;
