import TeamCard from "components/layouts/TeamCard";
import TeamList from "./data.json";

const TeamSection: React.FC = () => {
  return (
    <section
      id="team"
      className="w-full px-4 pt-32 mx-auto sm:px-0 font-display"
    >
      <div className="max-w-3xl mx-auto">
        <img src="/assets/borders/team.png" className="mx-auto" width={400} />
        <p className="mt-6 mb-10 text-lg text-center text-white sm:text-3xl">
          The team consists of passionate people who believe in the future of
          Web3, Gaming, and Blockchain Technology.
        </p>
      </div>
      <div className="max-w-5xl px-4 mx-auto">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TeamList.map((item, index) => (
            <TeamCard
              key={index}
              name={item.name}
              position={item.position}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
