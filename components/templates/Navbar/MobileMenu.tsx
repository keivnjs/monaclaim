import { useEffect, useState } from "react";
import { classNames } from "shared/utils/classNames";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setScrolled] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  });

  const mobileMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenuMobile = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", hideMenuMobile);

    return () => {
      window.removeEventListener("resize", hideMenuMobile);
    };
  });
  return (
    <>
      <div className="w-full block lg:hidden">
        <div className="absolute -top-16 inset-y-0 h-32 -mx-1 overflow-hidden">
          <img
            src="/assets/bg-navbar.png"
            alt="Logo"
            className="w-full h-40"
          />
        </div>
        {/* MOBILE TOGGLE */}
        <div className={classNames(
          "relative flex items-center justify-between px-5 py-2 z-10"
        )}>
          <div className="flex-col">
            <a href="#" className="flex uppercase items-center space-x-4">
              <img src="/assets/icons/icon-game.png" className="w-8" />
              <span className="font-bold text-2xl text-amber-200">Knights Game</span>
            </a>
          </div>
          <div className="flex flex-col">
            <button
              className="outline-none mobile-menu-button rounded-xl"
              onClick={mobileMenu}
            >
              <svg
                className="w-6 h-6 text-amber-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          isOpen ? "" : "hidden",
          "absolute top-14 w-full bg-amber-900"
        )}
      >
        <ul className="w-full space-y-2 bg-amber-900 p-2 font-sans text-sm text-white">
          <li>
            <a
              href="#troops"
              className="block hover:bg-amber-800 focus:bg-amber-700 transition rounded-lg duration-300 px-3 py-2"
            >
              Troops
            </a>
          </li>
          <li>
            <a
              href="#gameplay"
              className="block hover:bg-amber-800 focus:bg-amber-700 transition rounded-lg duration-300 px-3 py-2"
            >
              Gameplay
            </a>
          </li>
          <li>
            <a
              href="#roadmap"
              className="block hover:bg-amber-800 focus:bg-amber-700 transition rounded-lg duration-300 px-3 py-2"
            >
              Roadmap
            </a>
          </li>
          <li>
            <a
              href="#team"
              className="block hover:bg-amber-800 focus:bg-amber-700 transition rounded-lg duration-300 px-3 py-2"
            >
              Teams
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
