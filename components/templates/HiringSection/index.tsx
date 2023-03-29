import HiringCard from "components/layouts/HiringCard";
import HiringList from "./data.json";

const HiringSection: React.FC = () => {
  return (
    <section
      id="hiring"
      className="w-full mx-auto pt-32 px-2 sm:px-0 font-display"
    >
      <div className="max-w-3xl mx-auto">
        <img src="/assets/borders/hiring.png" className="mx-auto" width={400} />
        <p className="text-lg sm:text-3xl text-center text-white mt-6 mb-10">
          We are open for highly skilled talent who are seeking more adventure
          with us. Please reach us on{" "}
          <a href="mailto:dev@knights.game" className="text-red-300 hover:text-red-400" >
            dev@knights.game
          </a>{" "}
          if you are interested!
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {HiringList.map((item, index) => (
            <HiringCard key={index} position={item.position} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiringSection;
