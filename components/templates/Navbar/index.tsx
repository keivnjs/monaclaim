import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC = () => {
  const [background, setBackground] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <nav className="flex justify-center w-full fixed z-50 font-display">
      <div className="max-w-7xl w-full hidden lg:block relative">
        <img
          src="/assets/bg-navbar.png"
          alt="Logo"
          className="w-full -mt-16 h-36"
        />
        <a
          href="#"
          className="absolute inset-x-0 top-6"
        >
          <img
            src="/assets/icons/icon-game.png"
            className="w-20 xl:w-24 mx-auto"
          />
        </a>
        <div className="absolute flex top-2 w-full mx-auto px-16 z-[2] items-center">
          <div className="hidden md:flex w-full justify-between mx-auto text-xl text-yellow-200 uppercase">
            <a
              href="#troops"
              className="font-semibold hover:text-yellow-50 focus:text-yellow-500 transition-colors duration-150"
            >
              Troops
            </a>
            <a
              href="#gameplay"
              className="font-semibold hover:text-yellow-50 focus:text-yellow-500 transition-colors duration-150"
            >
              Gameplay
            </a>
            <a
              href="#roadmap"
              className="font-semibold hover:text-yellow-50 focus:text-yellow-500 transition-colors duration-150"
            >
              Roadmap
            </a>
            <a
              href="#faq"
              className="font-semibold hover:text-yellow-50 focus:text-yellow-500 transition-colors duration-150"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>

      <MobileMenu />
    </nav>
  );
};

export default Navbar;
