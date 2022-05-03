import { getMoviePoster } from "../../utils/movie";
import { useState } from "react";
import { getReleaseYear } from "./../../utils/movie";
import { useRouter } from "next/router";

const SearchResult = ({ movie }) => {
  const [active, setActive] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      onClick={() => router.push("/movies/" + movie.id)}
    >
      <img
        className="object-cover h-full"
        src={getMoviePoster(movie.poster_path)}
        alt=""
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      />
      {active && (
        <div className="absolute top-0 z-20 flex flex-col justify-end w-full h-full p-4 pointer-events-none bg-black/75">
          <h1 className="text-xl font-bold gradientText">{movie.title}</h1>
          <h1 className="text-white">
            {movie.release_date && getReleaseYear(movie.release_date)}
          </h1>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
