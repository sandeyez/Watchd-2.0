import FeedBody from "./FeedBody";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useUserData } from "../../../contexts/UserDataContext";
import { sortReviewsByCreatedAt } from "../../../utils/reviews";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const { following, getReviews, getUserReviewedMovies } = useUserData();

  useEffect(() => {
    fetchFeedData();
  }, [following]);

  async function fetchFeedData() {
    setLoading(true);
    const feedData = await Promise.all(
      following.map(async (followeeId) => {
        const reviews = await getReviews(followeeId);
        return { reviews, followeeId };
      })
    );

    let friendReviews = await Promise.all(
      feedData.map(async ({ reviews, followeeId }) => {
        const reviewedMovies = await getUserReviewedMovies(followeeId, reviews);
        return reviewedMovies;
      })
    );

    friendReviews = [].concat(...friendReviews);
    friendReviews.sort(sortReviewsByCreatedAt);

    setFeed(friendReviews);
    setLoading(false);
  }

  function handleRefresh() {
    toast.promise(fetchFeedData(), {
      loading: "Refreshing...",
      success: "Refreshed feed!",
      error: "Error refreshing feed!",
    });
  }

  return (
    <div className="relative flex flex-col w-full gap-4 p-6 bg-gradient-to-b from-regularBlue to-darkBlue rounded-t-xl noScrollbar">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold mini:text-2xl">
          Your friends' activity
        </h1>
        <div className="flex space-x-4 group">
          <h1 className="hidden group-hover:hidden mini:group-hover:block">
            Refresh
          </h1>
          <FiRefreshCcw
            size={24}
            className="transition-all duration-500 ease-out cursor-pointer hover:rotate-180 active:scale-125"
            onClick={handleRefresh}
          />
        </div>
      </div>
      <FeedBody data={feed} loading={loading} />
    </div>
  );
};

export default Feed;
