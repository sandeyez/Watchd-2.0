import { useEffect, useState } from "react";
import { getMovie } from "../../../providers/apiProvider";
import { getMovieBackdrop, getMoviePoster } from "./../../../utils/movie";
import { getReleaseYear } from "./../../../utils/movie";
import { useRouter } from "next/router";
import { routeMovie } from "../../../utils/movie";
import { routeUser } from "../../../utils/profile";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";

function FriendPost({ post }) {
  const [movie, setMovie] = useState();
  const router = useRouter();

  useEffect(() => {
    fetchMovie();
    TimeAgo.addDefaultLocale(en);
  }, [post]);

  async function fetchMovie() {
    const movieData = await getMovie(post.movieId);
    setMovie(movieData);
  }

  console.log(post);

  if (!movie) return null;
  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      <div className="absolute">
        <img src={getMovieBackdrop(movie.backdrop_path)} />
      </div>
      <div className="absolute w-full h-full bg-gradient-to-b from-darkBlue/60 to-darkBlue/100" />
      <div className="relative flex px-8 py-6 space-x-4">
        <img src={getMoviePoster(movie.poster_path)} className="h-40" />
        <div className="flex flex-col justify-end">
          <h1>
            <b
              className="cursor-pointer"
              onClick={() => routeUser(router, post.username)}
            >
              {post.username}
            </b>{" "}
            watchd
          </h1>
          <h1
            className="text-2xl font-bold cursor-pointer gradientText"
            onClick={() => routeMovie(router, movie.id)}
          >
            {movie.title}
          </h1>
          <h1 className="text-sm">{getReleaseYear(movie.release_date)}</h1>
          <h1 className="text-grey">{post.description}</h1>
        </div>
      </div>
      <div className="absolute top-4 right-4 text-grey">
        <ReactTimeAgo date={post.createdAt.toDate()} locale="en-US" />
      </div>
    </div>
  );
}

export default FriendPost;
