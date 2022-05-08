import { useAuth } from "../../../contexts/AuthContext";

const ProfilePicture = () => {
  const { user } = useAuth();

  return (
    <div
      className={"w-8 h-8 overflow-hidden border-2 border-white rounded-full"}
    >
      <img src={user?.photoURL ? user.photoURL : "/no_picture.svg"} alt="" />
    </div>
  );
};

export default ProfilePicture;
