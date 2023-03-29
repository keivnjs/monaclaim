import AttackIcon from "components/elements/Icons/Attack";
import DeffenseIcon from "components/elements/Icons/Deffense";
import BloodIcon from "components/elements/Icons/Blood";

const TroopStats: React.FC<{
  name?: string;
  description?: string;
  image?: string;
  attack?: number;
  attackDivisor?: number;
  deffense?: number;
  deffenseDivisor?: number;
  hp?: number;
  hpDivisor?: number;
}> = (props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 space-x-0 sm:space-x-10 -mx-14 sm:mx-0">
      <div className="w-4/6 sm:w-1/2 relative mx-auto">
        <img src={props.image} className="z-20" />
        <p className="absolute top-[12%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl text-yellow-200 font-display">
          {props.name}
        </p>
      </div>
      <div className="w-full flex-col space-y-5 my-auto z-20">
        <p className="text-2xl font-bold text-white mb-2">{props.name}</p>
        <span className="text-white mb-10">{props.description}</span>
        <div className="flex space-x-5">
          <div className="flex-col">
            <AttackIcon className="w-10 sm:w-14 h-10 sm:h-14" />
          </div>
          <div className="w-full flex-col">
            <div className="flex justify-between">
              <p className="text-base text-white">ATK</p>
              <p className="text-base text-white">{props.attack}</p>
            </div>
            <div
              className="bg-gray-800 border-y-2 border-gray-700 h-4 mt-0 sm:mt-3"
              role="progressbar"
            >
              <div
                className="bg-yellow-400 h-3 text-center"
                style={{
                  width: `${(props.attack / props.attackDivisor) * 100}%`,
                  transition: `width 1s`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex space-x-5">
          <div className="flex-col">
            <DeffenseIcon className="w-10 sm:w-14 h-10 sm:h-14" />
          </div>
          <div className="w-full flex-col">
            <div className="flex justify-between">
              <p className="text-base text-white">DEF</p>
              <p className="text-base text-white">{props.deffense}</p>
            </div>
            <div
              className="bg-gray-800 border-y-2 border-gray-700 h-4 mt-0 sm:mt-3"
              role="progressbar"
            >
              <div
                className="bg-yellow-400 h-3 text-center"
                style={{
                  width: `${(props.deffense / props.deffenseDivisor) * 100}%`,
                  transition: `width 1s`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex space-x-5">
          <div className="flex-col">
            <BloodIcon className="w-10 sm:w-14 h-10 sm:h-14" />
          </div>
          <div className="w-full flex-col">
            <div className="flex justify-between">
              <p className="text-base text-white">HP</p>
              <p className="text-base text-white">{props.hp}</p>
            </div>
            <div
              className="bg-gray-800 border-y-2 border-gray-700 h-4 mt-0 sm:mt-3"
              role="progressbar"
            >
              <div
                className="bg-yellow-400 h-3 text-center"
                style={{
                  width: `${(props.hp / props.hpDivisor) * 100}%`,
                  transition: `width 1s`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroopStats;
