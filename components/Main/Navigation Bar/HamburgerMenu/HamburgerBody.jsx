import NavItems from "./../NavItems";
import ProfilePicture from "./../ProfilePicture";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../../../contexts/AuthContext";

const HamburgerBody = ({ onClose }) => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col justify-between flex-grow text-white">
      <div>
        <NavItems onClick={onClose} />
      </div>
      {user && (
        <div>
          <div className="flex items-center space-x-2">
            <ProfilePicture />
            <h1 className="font-bold gradientText">{user.displayName}</h1>
          </div>
          <div
            className="flex items-center justify-end gap-2 mb-4 text-sm font-semibold cursor-pointer"
            onClick={logout}
          >
            <MdLogout />
            <h1>Logout</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerBody;
