import { useEffect, useState } from "react";
import SideCard from "./SideCard";
import { getReleaseYear } from "./../../../utils/movie";
import { useAuth } from "../../../contexts/AuthContext";

const SideBody = ({
  fetchFunction,
  EmptyComponent = () => <div></div>,
  NotSignedInComponent = () => <div></div>,
  authDependent = false,
  fetchDependencies = [],
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [user, ...fetchDependencies]);

  async function fetchData() {
    const data = await fetchFunction();
    setMovies(data);
  }

  if (authDependent && !user) return <NotSignedInComponent />;

  if (movies?.length < 1) return <EmptyComponent />;

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
