import Head from "next/head";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import WatchlistBody from "../components/Watchlist/WatchlistBody";
import { useUserData } from "../contexts/UserDataContext";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const { fetchWatchlistMovies } = useUserData();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetchWatchlistMovies();
    setMovies(data);
  }
  return (
    <div className="text-white px-8 max-w-[1440px] m-auto py-2 flex flex-col">
      <Head>
        <title>Watchlist | Watchd.</title>
      </Head>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Your watchlist</h1>
        <div className="flex p-4 cursor-pointer bg-regularBlue rounded-xl">
          <span className="mr-4 font-bold">Filter</span>
          <FaFilter size={24} />
        </div>
      </div>
      <WatchlistBody movies={movies} />
    </div>
  );
};

export default Watchlist;
