import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import SearchResult from "../Search/SearchResult";

function WatchlistBody({ movies }) {
  const { user } = useAuth();

  if (!user) return <p>You have to be logged in to keep a watchlist</p>;

  if (movies.length < 1)
    return (
      <p>
        You have no movies on your watchlist. Add movies you want to watch
        later.
      </p>
    );
  return (
    <div className="grid h-full grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
      {movies.map((movie) => (
        <SearchResult movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

export default WatchlistBody;
