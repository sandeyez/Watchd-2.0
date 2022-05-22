import RegularButton from "../Common/RegularButton";
import GradientButton from "../Common/GradientButton";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { useUserData } from "../../contexts/UserDataContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMovie } from "../../pages/movies/[movieId]";

const MovieButtons = ({ id }) => {
  const { user } = useAuth();
  const { addToWatchlist, watchlistContains, removeFromWatchlist } =
    useUserData();
  const { setCheckInVisible, userHasReviewed } = useMovie();

  const onWatchlist = watchlistContains(id);

  if (!user) return <div></div>;
  return (
    <div className="flex flex-col justify-end max-w-md col-span-2 gap-2 mini:gap-4 mini:flex-row md:gap-2 md:col-span-1 md:flex-col">
      <GradientButton
        text={userHasReviewed ? "Reviewed" : "Check-in"}
        onClick={() => setCheckInVisible(true)}
        disabled={userHasReviewed}
      />
      <RegularButton
        text={onWatchlist ? "Remove" : "Add to watchlist"}
        onClick={
          onWatchlist ? () => removeFromWatchlist(id) : () => addToWatchlist(id)
        }
      >
        {onWatchlist ? (
          <IoMdTrash className="w-6 h-6" />
        ) : (
          <IoMdAdd className="w-6 h-6" />
        )}
      </RegularButton>
    </div>
  );
};

export default MovieButtons;
