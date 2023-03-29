import VideoBorderIcon from "components/elements/Icons/VideoBorder";
import Image from "next/image";

const GameplaySection: React.FC = () => {
  return (
    <section
      id="gameplay"
      className="max-w-4xl flex flex-col mx-auto justify-between items-center text-black relative pt-32 px-2 font-display"
    >
      <div className="text-lg mx-auto mb-10">
        <div className="text-lg sm:text-3xl text-white">
          <img src="/assets/borders/game-play.png" className="mx-auto" />
          <p className="text-center mt-6">
            You are free to create landscape, strategy and troops as you like.
            There are walls, towers, baracks and many more that you can explore.
            Build and protect your kingdom to win!
          </p>
        </div>
      </div>
      <div className="w-full relative border-x-[10px] border-b-[15px] bg-orange-400 border-orange-400 rounded-3xl shadow-gray-300 mx-auto">
        <iframe
          src="https://www.youtube.com/embed/ng3oJ24wjhQ"
          className="w-full h-[23vh] sm:h-[56vh] rounded-3xl"
          frameBorder={0}
        ></iframe>
      </div>
    </section>
  );
};

export default GameplaySection;
