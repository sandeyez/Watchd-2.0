import Logo from "./../Logo";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const HamburgerHeader = ({ onClose }) => {
  return (
    <>
      <div className="flex items-center justify-center h-16">
        <Logo />
      </div>
      <MdOutlineArrowBackIosNew
        className="absolute text-3xl text-white cursor-pointer left-8 top-6"
        onClick={onClose}
      />
      <hr className="mb-4" />
    </>
  );
};

export default HamburgerHeader;
