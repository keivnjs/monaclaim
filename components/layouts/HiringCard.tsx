import VideoBorderIcon from "components/elements/Icons/VideoBorder";
import { GlobeIcon } from "@heroicons/react/outline";

const HiringCard: React.FC<{
  position?: string;
}> = (props) => {
  return (
    <div className="relative flex items-center justify-center p-8 font-sans text-white transition-all transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-yellow-900">
      <VideoBorderIcon className="absolute w-full h-full" />
      <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
        <p className="text-lg font-semibold text-center">{props.position}</p>
        <div className="flex items-center space-x-4 bottom-10">
          <GlobeIcon className="w-5 h-5" />
          <p className="my-auto">Remote</p>
        </div>
      </div>
    </div>
  );
};

export default HiringCard;
