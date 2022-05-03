import { useEffect, useState } from "react";
import SideCard from "./SideCard";
import { getReleaseYear } from "./../../../utils/movie";

const SideBody = ({ fetchFunction }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetchFunction();
    setMovies(data);
  }

  return (
    <div className="grid w-auto h-full grid-flow-col grid-rows-1 gap-4 overflow-x-auto overflow-y-hidden noScrollbar auto-cols-max md:flex md:overflow-x-hidden md:overflow-y-scroll md:flex-col ">
      {movies.map((movie) => (
        <SideCard
          title={movie.title}
          year={getReleaseYear(movie.release_date)}
          posterPath={movie.poster_path}
          id={movie.id}
          key={movie.id}
        />
      ))}
    </div>
  );
};

export default SideBody;
