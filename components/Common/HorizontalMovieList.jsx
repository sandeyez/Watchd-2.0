import { getMoviePoster } from "../../utils/movie";
import { useRouter } from "next/router";
import SquareButton from "./SquareButton";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useRef, useEffect, useState } from "react";
import useScreenWidth from "./../../hooks/useScreenWidth";

const HorizontalMovieList = ({ header, title, movies }) => {
  const router = useRouter();
  const containerRef = useRef();

  return (
    <>
      <div>
        {header && <header className="text-xl font-bold">{header}</header>}
        {title && <header className="text-2xl font-bold">{title}</header>}
        <div className="relative">
          <div
            className="flex gap-4 mt-2 overflow-x-scroll noScrollbar"
            ref={containerRef}
          >
            {movies.map((movie) => (
              <img
                className="w-20 rounded-lg cursor-pointer mini:w-24 lg:w-36"
                src={getMoviePoster(movie.poster_path)}
                onClick={() => {
                  router.push(`/movies/${movie.id}`);
                  containerRef.current.scrollLeft = 0;
                }}
                key={movie.id}
              />
            ))}
          </div>
          <ScrollArrows containerRef={containerRef} />
        </div>
      </div>
    </>
  );
};

export default HorizontalMovieList;

const ScrollArrows = ({ containerRef }) => {
  const smallScreen = useScreenWidth("max", 1024);

  const scrollOffset = smallScreen ? 192 : 320;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return setDisabled(true);
    setDisabled(
      containerRef.current.scrollWidth === containerRef.current.clientWidth
    );
  }, [containerRef.current]);

  // if (disabled) return null;

  return (
    <>
      <LeftArrow containerRef={containerRef} scrollOffset={scrollOffset} />
      <RightArrow containerRef={containerRef} scrollOffset={scrollOffset} />
    </>
  );
};

const LeftArrow = ({ containerRef, scrollOffset }) => {
  return (
    <div className="absolute top-0 left-0 flex items-center h-full">
      <SquareButton
        onClick={() => (containerRef.current.scrollLeft -= scrollOffset)}
      >
        <MdOutlineArrowBackIos className="w-4 lg:w-6 aspect-square" />
      </SquareButton>
    </div>
  );
};

const RightArrow = ({ containerRef, scrollOffset }) => {
  return (
    <div className="absolute top-0 flex items-center h-full right-8 lg:right-10">
      <SquareButton
        onClick={() => (containerRef.current.scrollLeft += scrollOffset)}
      >
        <MdOutlineArrowForwardIos className="w-4 lg:w-6 aspect-square" />
      </SquareButton>
    </div>
  );
};
