import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "./../components/Discover/Header";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../providers/apiProvider";
import Loading from "../components/Main/Loading";
import HorizontalMovieList from "./../components/Common/HorizontalMovieList";

const Discover = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const popularData = await getPopularMovies();
    setPopularMovies(popularData);
    let upcomingData = await getUpcomingMovies();
    // upcomingData = upcomingData.filter(({ release_date }) =>
    //   releaseAfterToday(release_date)
    // );
    setUpcomingMovies(upcomingData);
    let topRatedData = await getTopRatedMovies();
    setTopRatedMovies(topRatedData);
  }

  function releaseAfterToday(date) {
    const releaseDate = new Date(date);
    const today = new Date();

    return releaseDate > today;
  }

  if (popularMovies.length === 0 || upcomingMovies.length === 0)
    return <Loading />;

  return (
    <div className="text-white px-8 max-w-[1440px] m-auto py-2 flex flex-col gap-10">
      <Head>
        <title>Discover | Watchd.</title>
      </Head>
      <Header popularMovies={popularMovies} />
      <HorizontalMovieList title="Popular movies" movies={popularMovies} />
      <HorizontalMovieList title="Upcoming movies" movies={upcomingMovies} />
      <HorizontalMovieList title="Top-rated movies" movies={topRatedMovies} />
    </div>
  );
};

export default Discover;
