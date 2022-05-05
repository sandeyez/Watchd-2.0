import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavItems from "./NavItems";
import HamburgerNav from "./HamburgerMenu/HamburgerNav";
import useScreenWidth from "./../../../hooks/useScreenWidth";

const Nav = () => {
  const renderHamburger = useScreenWidth("max", 870);

  if (renderHamburger) return <HamburgerNav />;
  return (
    <nav className="flex xl:grid h-20 grid-cols-[3fr_2fr_3fr] grid-rows-1 px-8 justify-between gap-4">
      <Logo />
      <SearchBar />
      <NavItems />
    </nav>
  );
};

export default Nav;
