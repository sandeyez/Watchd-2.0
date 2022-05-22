import { useEffect, useState, createContext, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getMovie } from "../../providers/apiProvider";
import Loading from "../../components/Main/Loading";
import Body from "../../components/Movie/Body";
import Header from "../../components/Movie/Header";
import Banner from "../../components/Movie/Banner";
import ReleaseDate from "../../components/Movie/ReleaseDate";
import CheckInPopup from "../../components/Movie/CheckInPopup";
import { useUserData } from "../../contexts/UserDataContext";
import { queryDatabase } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

const MovieContext = createContext();

export const useMovie = () => {
  return useContext(MovieContext);
};

const Movie = ({ movieId }) => {
  const [movie, setMovie] = useState();
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [review, setReview] = useState();
  const [checkInVisible, setCheckInVisible] = useState(false);

  const { reviews } = useUserData();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [movieId]);

  useEffect(() => {
    if (reviews) {
      const userHasReview = reviews.some((reviewId) => reviewId === movieId);
      setUserHasReviewed(userHasReview);

      if (userHasReview) {
        fetchReview();
      } else {
        setReview({});
      }
    }
  }, [reviews, movieId]);

  console.log("userHasReviewed", userHasReviewed);

  async function fetchData() {
    try {
      const data = await getMovie(movieId);
      setMovie(data);
    } catch (error) {
      router.replace("/not-found");
    }
  }

  async function fetchReview() {
    const userReview = await queryDatabase(
      "Reviews",
      "uid",
      "==",
      user.uid,
      (review) => review.movieId === movieId
    );
    console.log("userReview", userReview);
    setReview(userReview[0]);
  }

  if (!movie) {
    return <Loading />;
  }

  return (
    <MovieContext.Provider
      value={{
        movie,
        checkInVisible,
        setCheckInVisible,
        userHasReviewed,
        review,
      }}
    >
      <Head>
        <title>{movie.title} | Watchd.</title>
      </Head>
      <CheckInPopup
        popupActive={checkInVisible}
        setPopupActive={setCheckInVisible}
      />
      <div className="relative w-full h-full">
        <div className="top-0 left-0 right-0 z-20 m-auto md:absolute">
          <ReleaseDate date={movie.release_date} />
        </div>
        <Banner backdropPath={movie.backdrop_path} />
        <div className="absolute z-20 grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_3fr_1fr] max-w-[1024px] xl:max-w-[1250px] mt-4 sm:mt-8 md:mt-16 gap-6 text-white left-0 right-0 m-auto px-8">
          <Header />
          <Body />
        </div>
      </div>
    </MovieContext.Provider>
  );
};

export default Movie;

export function getServerSideProps(ctx) {
  try {
    const { movieId } = ctx.query;
    return { props: { movieId: parseInt(movieId) } };
  } catch (error) {
    return { notFound: true };
  }
}
