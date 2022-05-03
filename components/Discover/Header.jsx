import { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { getMovieBackdrop, getMoviePoster } from "./../../utils/movie";
import RegularButton from "../Common/RegularButton";
import { useRouter } from "next/router";
import useScreenWidth from "./../../hooks/useScreenWidth";

const Header = ({ popularMovies }) => {
  const [headerMovie, setHeaderMovie] = useState(popularMovies[0]);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const renderSmall = useScreenWidth("max", 870);

  useEffect(() => {
    setHeaderMovie(popularMovies[index]);
    const timer = setTimeout(() => incrementIndex(), 5000);

    return () => clearTimeout(timer);
  }, [index]);

  const incrementIndex = () => {
    setIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
  };

  const decrementIndex = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? popularMovies.length - 1 : prevIndex - 1
    );
  };

  if (renderSmall) return null;

  return (
    <div className="relative w-full h-auto overflow-hidden md:h-96">
      <img
        className="object-contain w-full"
        src={getMovieBackdrop(headerMovie.backdrop_path)}
        alt=""
      />
      <div className="absolute top-0 z-10 w-full h-full bg-darkBlue/75"></div>
      <div className="absolute top-0 z-20 flex flex-col justify-between w-full h-full gap-2 p-8">
        <div className="flex justify-between">
          <MdOutlineArrowBackIos
            className="cursor-pointer"
            onClick={decrementIndex}
          />
          <MdOutlineArrowForwardIos
            className="cursor-pointer"
            onClick={incrementIndex}
          />
        </div>
        <div>
          <h1
            className="inline-block text-4xl font-bold cursor-pointer"
            onClick={() => router.push("/movies/" + headerMovie.id)}
          >
            {headerMovie.title}
          </h1>
          <h1 className="hidden w-1/2 sm:line-clamp-2">
            {headerMovie.overview}
          </h1>
          <hr className="w-24 mt-2 mb-4" />
          <div className="w-56">
            <RegularButton text="Add to Watchlist" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
