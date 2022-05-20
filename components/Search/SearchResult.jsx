import { getMoviePoster } from "../../utils/movie";
import { useState } from "react";
import { getReleaseYear } from "./../../utils/movie";
import { useRouter } from "next/router";
import { MdClose } from "react-icons/md";

const SearchResult = ({ movie, showClose = false, onClose = () => {} }) => {
  const router = useRouter();

  return (
    <div className="relative">
      {showClose && (
        <MdClose
          size={24}
          onClick={onClose}
          className="absolute z-30 hidden cursor-pointer group-hover:block top-2 right-2"
        />
      )}
      <div
        className="w-full h-full cursor-pointer group"
        onClick={() => router.push("/movies/" + movie.id)}
      >
        <img
          className="object-cover h-full"
          src={getMoviePoster(movie.poster_path)}
          alt=""
        />

        <div className="absolute top-0 z-20 flex-col justify-end hidden w-full h-full p-4 pointer-events-none bg-gradient-to-b from-black/50 to-black group-hover:flex quickFadeIn">
          <h1 className="text-xl font-bold gradientText">{movie.title}</h1>
          <h1 className="text-white">
            {movie.release_date && getReleaseYear(movie.release_date)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
