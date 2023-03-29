import BloodIcon from "components/elements/Icons/Blood";
import { useState } from "react";

const Accordion: React.FC<{ title?: string; description?: string }> = (
  props
) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="font-sans flex flex-col p-4 cursor-pointer border-2 border-yellow-700 bg-yellow-900 shadow-md shadow-orange-900 rounded-xl"
    >
      <div className="flex flex-row space-x-4 items-center">
        <BloodIcon className="w-6 h-6" />
        <p className="flex-auto text-lg text-yellow-100 my-auto">
          {props.title}
        </p>
        {expanded ? (
          <img
            className="flex-none hover:brightness-105 active:brightness-95 hover:-translate-y-px w-6"
            src="/assets/button-min.png"
          />
        ) : (
          <img
            className="flex-none hover:brightness-105 active:brightness-95 hover:-translate-y-px w-6"
            src="/assets/button-add.png"
          />
        )}
      </div>
      <div
        className={`transition-max-height duration-700 ease-in-out overflow-hidden mx-7 sm:mx-10 ${expanded ? "max-h-20" : "max-h-0"
          }`}
      >
        <p className="text-white mt-3">{props.description}</p>
      </div>
    </div>
  );
};

export default Accordion;
