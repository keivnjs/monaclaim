import { useState } from "react";
import ArrowLeftIcon from "components/elements/Icons/ArrowLeft";
import ArrowRightIcon from "components/elements/Icons/ArrowRight";
import TroopStats from "components/layouts/TroopStats";
import TroopsList from "./data.json";
import { classNames } from "shared/utils/classNames";

const TroopsInfoSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === TroopsList.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? TroopsList.length - 1 : current - 1);
  };

  return (
    <section
      id="troops"
      className="w-full px-2 pt-32 lg:px-0"
      style={{
        background: 'url("/assets/bg-info-troops.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col px-4 mx-auto max-w-7xl">
        <img
          src="/assets/landing-page/divider.png"
          width={400}
          className="mx-auto mb-8"
        />
        <div className="relative flex items-center w-full">
          <div className="absolute inset-y-0 hidden w-full mx-0 lg:block">
            <img
              src="/assets/borders/troops-board.png"
              className="w-full h-auto mx-auto"
            />
          </div>
          <div
            className={classNames(
              "relative inset-x-0 sm:inset-x-1",
              "flex max-w-6xl items-center justify-between mx-auto",
              "space-x-0 sm:space-x-5 px-0 py-24 sm:px-12"
            )}
          >
            <div className="relative z-10 -mt-28 sm:mt-0">
              <button
                className="transition-all transform hover:-translate-x-1 hover:shadow-2xl hover:shadow-yellow-900"
                onClick={() => {
                  prevSlide();
                }}
              >
                <ArrowLeftIcon className="w-14 h-14 sm:w-14 sm:h-14" />
              </button>
            </div>
            <div className="flex-col">
              <TroopStats
                name={TroopsList[current].name}
                description={TroopsList[current].description}
                image={TroopsList[current].image}
                attack={TroopsList[current].attack}
                attackDivisor={TroopsList[current].attackDivisor}
                deffense={TroopsList[current].deffense}
                deffenseDivisor={TroopsList[current].deffenseDivisor}
                hp={TroopsList[current].hp}
                hpDivisor={TroopsList[current].hpDivisor}
              />
            </div>
            <div className="relative z-10 -mt-28 sm:mt-0">
              <button
                className="transition-all transform hover:translate-x-1 hover:shadow-2xl hover:shadow-yellow-900"
                onClick={() => {
                  nextSlide();
                }}
              >
                <ArrowRightIcon className="mx-auto w-14 h-14 sm:w-14 sm:h-14" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-around max-w-4xl mx-auto mt-10 sm:mt-20 font-display">
        <p className="mx-auto mb-10 text-3xl text-center text-white sm:text-4xl sm:mb-10">
          Get yourself an exclusive custom drawn Legendary Knight and earn
          higher stake reward!
        </p>
        <video autoPlay loop muted className="w-full mb-10 sm:mb-20">
          <source
            src="https://dnfbzteyqswefjrywktm.supabase.in/storage/v1/object/public/content/GIF%20Legendary.mp4"
            type="video/mp4"
            className=""
          />
        </video>
      </div>
    </section>
  );
};

export default TroopsInfoSection;
