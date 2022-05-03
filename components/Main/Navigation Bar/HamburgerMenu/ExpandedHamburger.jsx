import HamburgerHeader from "./HamburgerHeader";
import HamburgerBody from "./HamburgerBody";
const ExpandedHamburger = ({ onClose }) => {
  return (
    <>
      <div className="absolute top-0 w-screen h-screen bg-black z-[998] bg-opacity-60"></div>
      <nav className="absolute top-0 h-screen max-w-96 bg-regularBlue z-[999]">
        <div className="flex flex-col h-full px-20 py-2">
          <HamburgerHeader onClose={onClose} />
          <HamburgerBody onClose={onClose} />
        </div>
      </nav>
    </>
  );
};

export default ExpandedHamburger;
