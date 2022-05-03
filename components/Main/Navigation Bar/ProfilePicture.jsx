const ProfilePicture = ({ className }) => {
  return (
    <div
      className={`w-8 h-8 overflow-hidden border-2 border-white rounded-full ${className}`}
    >
      <img src="https://picsum.photos/200" alt="" />
    </div>
  );
};

export default ProfilePicture;
