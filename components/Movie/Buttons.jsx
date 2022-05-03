import RegularButton from "./../Common/RegularButton";
import GradientButton from "./../Common/GradientButton";
import { IoMdAdd } from "react-icons/io";

const Buttons = () => {
  return (
    <div className="flex flex-col justify-end max-w-md col-span-2 gap-2 mini:gap-4 mini:flex-row md:gap-2 md:col-span-1 md:flex-col">
      <GradientButton text="Check-in" />
      <RegularButton text="Add to watchlist">
        <IoMdAdd className="w-6 h-6" />
      </RegularButton>
    </div>
  );
};

export default Buttons;
