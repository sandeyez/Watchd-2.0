import React, { useEffect, useState } from "react";
import { getMovie } from "../../providers/apiProvider";
import Loading from "../Main/Loading";
import MovieWithRating from "./MovieWithRating";

function ProfileMovieList({ header, reviewedMovies, sortFunction }) {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState(null);
  const [gridColumns, setGridColumns] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (reviewedMovies) {
      setReviews(reviewedMovies);
    }
  }, [reviewedMovies]);

  useEffect(() => {
    if (reviews) {
      fetchData();
    }
  }, [reviews]);

  async function fetchData() {
    if (reviews.length > 0) {
      const reviewsWithMovieData = Promise.all(
        reviews.map(async (review) => {
          const movie = await getMovie(review.movieId);
          return { ...review, movie };
        })
      );
      reviewsWithMovieData.then((data) => setMovies(data));
    }
  }

  function handleResize() {
    const width = window.innerWidth;

    if (width >= 1280) {
      setGridColumns(5);
    } else if (width >= 1024) {
      setGridColumns(5);
    } else if (width >= 870) {
      setGridColumns(4);
    } else if (width >= 640) {
      setGridColumns(3);
    } else {
      setGridColumns(2);
    }
  }

  if (movies === null) {
    return <Loading />;
  }

  return (
    <div className="text-white">
      <header className="flex items-center justify-between mb-2 text-xl font-bold">
        <h1>{header}</h1>
        <h1 className="text-sm font-normal cursor-pointer">View all &gt;</h1>
      </header>
      <div className="grid grid-cols-2 grid-rows-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies &&
          movies
            .sort(sortFunction)
            .slice(0, gridColumns)
            .map((review) => (
              <MovieWithRating review={review} key={header + review.movieId} />
            ))}
      </div>
    </div>
  );
}

export default ProfileMovieList;
