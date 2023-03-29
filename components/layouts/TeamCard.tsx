const TeamCard: React.FC<{
  name?: string;
  position?: string;
  image?: string;
}> = (props) => {
  return (
    <div className="relative transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-900">
      <img src={props.image} className="mx-auto" />
      <p className="absolute left-[10%] sm:left-[6%] top-[5%] text-base sm:text-3xl text-yellow-200 text-center">
        {props.name}
      </p>
      <p className="absolute left-[24%] bottom-[5%] sm:bottom-[4%] text-[60%] sm:text-sm lg:text-base text-white my-auto font-sans">
        {props.position}
      </p>
    </div>
  );
};

export default TeamCard;
