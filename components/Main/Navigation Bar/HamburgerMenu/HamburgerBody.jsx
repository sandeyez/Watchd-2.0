import NavItems from "./../NavItems";
import ProfilePicture from "./../ProfilePicture";
import { MdLogout } from "react-icons/md";
const HamburgerBody = ({ onClose }) => {
  return (
    <div className="flex flex-col justify-between flex-grow text-white">
      <div>
        <NavItems onClick={onClose} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <ProfilePicture />
          <h1 className="font-bold gradientText">Sandeyez</h1>
        </div>
        <div className="flex items-center justify-end gap-2 text-sm font-semibold cursor-pointer">
          <MdLogout />
          <h1>Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default HamburgerBody;
