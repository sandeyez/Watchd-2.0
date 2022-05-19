import { useAuth } from "../../contexts/AuthContext";
import { useMovie } from "../../pages/movies/[id]";
import { useEffect, useState } from "react";

const Ratings = () => {
  const { user } = useAuth();
  const { review, movie } = useMovie();
  const [userRating, setUserRating] = useState();

  useEffect(() => {
    setUserRating(review?.rating ? review.rating / 10 : "-");
  }, [review]);

  return (
    <div className="col-span-2 md:col-span-1">
      <h1 className="text-xl font-bold">Ratings</h1>
      <div className="flex flex-row gap-4 md:flex-col md:gap-2">
        {user && (
          <>
            <RatingElement title="Your rating" rating={userRating} />
            <RatingElement title="Friends rating" rating={9.8} />
          </>
        )}
        <RatingElement title="Overall rating" rating={movie.vote_average} />
      </div>
    </div>
  );
};

export default Ratings;

const RatingElement = ({ title, rating }) => {
  return (
    <div>
      <h1>{title && title}</h1>
      <span className="text-3xl font-bold">{rating !== 0 ? rating : "-"}</span>
      <span className="hidden mini:inline">/10</span>
    </div>
  );
};
