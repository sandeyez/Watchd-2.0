import Head from "next/head";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../providers/apiProvider";
import { FaFilter } from "react-icons/fa";
import CarousalView from "./../components/Watchlist/CarousalView";

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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Your watchlist</h1>
        <div className="flex p-4 cursor-pointer bg-regularBlue rounded-xl">
          <span className="mr-4 font-bold">Filter</span>
          <FaFilter size={24} />
        </div>
      </div>
      {/* <div className="grid h-full grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {movies.map((movie) => (
          <SearchResult movie={movie} key={movie.id} />
        ))}
      </div> */}
      <CarousalView movies={movies} />
    </div>
  );
};

export default Watchlist;
