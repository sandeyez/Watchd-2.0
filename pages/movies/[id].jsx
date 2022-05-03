import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getMovie } from "../../providers/apiProvider";
import Loading from "./../../components/Main/Loading";
import Body from "../../components/Movie/Body";
import Header from "./../../components/Movie/Header";
import Banner from "./../../components/Movie/Banner";
import ReleaseDate from "./../../components/Movie/ReleaseDate";

const Movie = ({ id }) => {
  const [movie, setMovie] = useState();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const data = await getMovie(id);
      setMovie(data);
      console.log(data);
    } catch (error) {
      router.replace("/not-found");
    }
  }
  if (!movie) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{movie.title} | Watchd.</title>
      </Head>
      <div className="relative w-full h-full">
        <div className="top-0 left-0 right-0 z-20 m-auto md:absolute">
          <ReleaseDate date={movie.release_date} />
        </div>
        <Banner backdropPath={movie.backdrop_path} />
        <div className="absolute z-20 grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_3fr_1fr] max-w-[1024px] xl:max-w-[1250px] mt-4 sm:mt-8 md:mt-16 gap-6 text-white left-0 right-0 m-auto px-8">
          <Header movie={movie} />
          <Body movie={movie} />
        </div>
      </div>
    </>
  );
};

export default Movie;

export function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return { props: { id } };
}
