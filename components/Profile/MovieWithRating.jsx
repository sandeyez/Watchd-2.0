import React from "react";
import SearchResult from "./../Search/SearchResult";
import Rating from "./../Common/Rating";

function MovieWithRating({ review }) {
  const { rating, movie } = review;

  return (
    <div className="relative overflow-hidden text-sm rounded-lg w-36 mini:w-48 xl:w-56">
      <SearchResult movie={movie} />
      {!isNaN(rating) && (
        <div className="absolute z-20 top-2 right-2">
          <Rating rating={rating} />
        </div>
      )}
    </div>
  );
}

export default MovieWithRating;
