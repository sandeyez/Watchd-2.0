import { MdLocalMovies, MdStar } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import NavItem from "./NavItem";
import useScreenWidth from "../../../hooks/useScreenWidth";
import { GoSearch } from "react-icons/go";
import ProfilePicture from "./ProfilePicture";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";

const NavItems = ({ onClick }) => {
  const renderSearch = useScreenWidth("max", 1280);
  const router = useRouter();

  return (
    <div className="flex flex-col items-start justify-end gap-6 text-white md:gap-8 md:items-center md:flex-row">
      {renderSearch && (
        <NavItem
          onClick={() => {
            router.push("/search");
            onClick ? onClick() : null;
          }}
        >
          <GoSearch />
          Search
        </NavItem>
      )}
      <NavItem
        onClick={() => {
          router.push("/discover");
          onClick ? onClick() : null;
        }}
      >
        <MdLocalMovies />
        Discover
      </NavItem>
      <NavItem
        onClick={() => {
          router.push("/watchlist");
          onClick ? onClick() : null;
        }}
      >
        <MdStar />
        Watchlist
      </NavItem>
      <ProfileIcon />
    </div>
  );
};

const ProfileIcon = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  console.log(user);

  if (!user) return null;

  return (
    <div className="items-center justify-start hidden gap-4 py-4 font-bold rounded-full md:flex h-1/2 bg-regularBlue ">
      <ProfilePicture className="ml-1" />
      <h1
        className="cursor-pointer gradientText"
        onClick={() => router.push(`/profile/${user.displayName}`)}
      >
        {user.displayName}
      </h1>
      <RiArrowDownSLine className="w-8 h-8 mr-1 cursor-pointer" />
    </div>
  );
};

export default NavItems;
