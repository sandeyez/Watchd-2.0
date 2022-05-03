import { MdLocalMovies } from "react-icons/md";
const RegularButton = ({ text, children, ...otherProps }) => {
  return (
    <button
      className="flex items-center justify-center w-full gap-1 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-300"
      {...otherProps}
    >
      {children}
      <h1 className="py-2">{text}</h1>
    </button>
  );
};

export default RegularButton;
