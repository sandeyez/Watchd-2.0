import SideHeader from "./SideHeader";
import { useUserData } from "../../../contexts/UserDataContext";
import SideBody from "./SideBody";

const Watchlist = () => {
  const { fetchWatchlistMovies, watchlist } = useUserData();

  const EmptyComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full text-xs text-center">
        <p className="font-bold">
          There are currently no movies in your watchlist
        </p>
        <p>Add movies you want to watch later</p>
      </div>
    );
  };

  const NotSignedInComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full text-xs text-center">
        <p className="font-bold">You are currently not logged in</p>
        <p>Log in to keep a watchlist</p>
      </div>
    );
  };

  return (
    <div className="h-[180px] md:h-auto p-6 bg-gradient-to-t md:bg-gradient-to-r from-darkBlue to-regularBlue rounded-tr-2xl overflow-y-scroll">
      <SideHeader title="Watchlist" option="all" optionUrl={"/watchlist"} />
      <SideBody
        fetchFunction={fetchWatchlistMovies}
        EmptyComponent={EmptyComponent}
        NotSignedInComponent={NotSignedInComponent}
        authDependent
        fetchDependencies={[watchlist]}
      />
    </div>
  );
};

export default Watchlist;
