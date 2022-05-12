import { getMoviePoster } from "../../utils/movie";
import Details from "./Details";
import MovieButtons from "./MovieButtons";
import { useMovie } from "../../pages/movies/[id]";

const Header = () => {
  const { movie } = useMovie();

  return (
    <>
      <img
        className="col-span-2 px-12 mini:col-span-1 mini:px-0"
        src={getMoviePoster(movie.poster_path)}
        alt={`${movie.title} poster`}
      />
      <Details
        title={movie.title}
        tagline={movie.tagline}
        releaseDate={movie.release_date}
        duration={movie.runtime}
      />
      <MovieButtons id={movie.id} />
    </>
  );
};

export default Header;
