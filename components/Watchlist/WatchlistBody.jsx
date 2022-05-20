import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import SearchResult from "../Search/SearchResult";
import { MdClose } from "react-icons/md";
import { useUserData } from "../../contexts/UserDataContext";

function WatchlistBody({ movies }) {
  const { user } = useAuth();
  const { removeFromWatchlist } = useUserData();

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
        <div className="relative group" key={movie.id}>
          <SearchResult
            movie={movie}
            showClose
            onClose={() => removeFromWatchlist(movie.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default WatchlistBody;
