const RoadmapSection: React.FC = () => {
  return (
    <section
      id="roadmap"
      className="w-full mx-auto pt-32 px-2 sm:px-0 font-display"
      style={{
        background: 'url("/assets/bg-roadmap.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <img
          src="/assets/borders/roadmap.png"
          className="mx-auto"
          width={500}
        />
        <p className="text-lg sm:text-3xl text-center text-white mt-6 mb-10">
          These are our main milestones in our future development. In the near
          future we will launch voting mechanism to get ideas and insights from
          community as well.
        </p>
        <img
          src="/assets/landing-page/roadmap.png"
          className="w-[80vh] mx-auto"
        />
      </div>
    </section>
  );
};

export default RoadmapSection;
