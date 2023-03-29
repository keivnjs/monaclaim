const ButtonRedFull: React.FC<{ text?: string }> = (props) => {
  return (
    <button className="w-full bg-red-500 text-lg text-white rounded-lg shadow-md shadow-red-800 px-4 py-2">
      {props.text}
    </button>
  );
};

export default ButtonRedFull;
