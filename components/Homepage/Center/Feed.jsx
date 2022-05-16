import FeedBody from "./FeedBody";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-hot-toast";

const Feed = () => {
  async function refreshFeed() {
    // Do something
  }

  function handleRefresh() {
    toast.promise(refreshFeed(), {
      loading: "Refreshing...",
      success: "Refreshed feed!",
      error: "Error refreshing feed!",
    });
  }

  return (
    <div className="flex flex-col w-full gap-10 p-6 overflow-y-scroll bg-gradient-to-b from-regularBlue to-darkBlue rounded-t-xl noScrollbar">
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
      <FeedBody />
    </div>
  );
};

export default Feed;
