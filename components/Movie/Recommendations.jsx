import { useEffect, useState } from "react";
import {
  getCollection,
  getRecommendedMovies,
} from "../../providers/apiProvider";
import HorizontalMovieList from "./../Common/HorizontalMovieList";

const Recommendations = ({ collection, movieID }) => {
  const [collectionMovies, setCollectionMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, [movieID]);

  const fetchData = async () => {
    if (collection) {
      const data = await getCollection(collection.id);
      data.sort((a, b) => {
        return a.release_date > b.release_date ? 1 : -1;
      });
      setCollectionMovies(data);
    }
    const data = await getRecommendedMovies(movieID).then((data) =>
      data.filter((movie) => !collectionMovies.some((m) => m.id === movie.id))
    );
    setRecommendedMovies(data);
  };

  return (
    <>
      {collection && (
        <HorizontalMovieList
          header={`Watch more from ${collection.name.replace(
            "Collection",
            ""
          )}`}
          movies={collectionMovies}
        />
      )}
      {recommendedMovies.length > 0 && (
        <HorizontalMovieList
          header="Recommended movies"
          movies={recommendedMovies}
        />
      )}
    </>
  );
};

export default Recommendations;
