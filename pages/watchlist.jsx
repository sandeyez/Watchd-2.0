import Head from "next/head";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../providers/apiProvider";
import SearchResult from "../components/Search/SearchResult";
import { FaFilter } from "react-icons/fa";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getPopularMovies();
    setMovies(data);
  }

  return (
    <div className="text-white px-8 max-w-[1440px] m-auto py-2 flex flex-col">
      <Head>
        <title>Watchlist | Watchd.</title>
      </Head>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-4xl">Your watchlist</h1>
        <div className="flex p-4 bg-regularBlue rounded-xl cursor-pointer">
          <span className="font-bold mr-4">Filter</span>
          <FaFilter size={24} />
        </div>
      </div>
      <div className="grid h-full grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {movies.map((movie) => (
          <SearchResult movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
