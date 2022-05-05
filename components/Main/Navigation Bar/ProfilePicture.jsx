import { useUser } from "../../../config/firebase";

const ProfilePicture = () => {
  const user = useUser();

  return (
    <div
      className={"w-8 h-8 overflow-hidden border-2 border-white rounded-full"}
    >
      <img src={user?.photoURL ? user.photoURL : "/no_picture.svg"} alt="" />
    </div>
  );
};

export default ProfilePicture;
