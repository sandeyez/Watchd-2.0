import useScreenWidth from "../../hooks/useScreenWidth";
import { useMovie } from "../../pages/movies/[id]";
import Cast from "./Cast";
import Center from "./Center";
import Ratings from "./Ratings";

const Body = () => {
  const { movie } = useMovie();
  const small = useScreenWidth("max", 640);
  const mid = useScreenWidth("max", 870);

  const cast = <Cast id={movie.id} />;
  const center = (
    <Center
      description={movie.overview}
      id={movie.id}
      collection={movie.belongs_to_collection}
    />
  );
  const ratings = <Ratings global={movie.vote_average} />;

  if (small)
    return (
      <>
        {center}
        {ratings}
        {cast}
      </>
    );
  if (mid)
    return (
      <>
        {ratings}
        {cast}
        {center}
      </>
    );

  return (
    <>
      {cast}
      {center}
      {ratings}
    </>
  );
};

export default Body;
