const ReleaseDate = ({ date }) => {
  if (date == "00" || !date) return null;

  const releaseDate = new Date(date);
  const today = new Date();

  if (today > releaseDate) return null;

  return (
    <div className="w-full py-2 font-bold text-center text-white bg-regularBlue/75">
      Releasing on {date}
    </div>
  );
};

export default ReleaseDate;
