import Logo from "./../Logo";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import ExpandedHamburger from "./ExpandedHamburger";

const HamburgerNav = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-center w-full h-20">
        <Logo />
        <MdMenu
          className="absolute text-3xl text-white cursor-pointer left-8"
          onClick={() => setExpanded((prev) => !prev)}
        />
      </div>
      {expanded && <ExpandedHamburger onClose={() => setExpanded(false)} />}
    </>
  );
};

export default HamburgerNav;
