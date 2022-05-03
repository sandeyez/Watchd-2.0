import Loading from "../Main/Loading";
import SearchResult from "./SearchResult";
import { useState } from "react";
import { getSearchResults } from "../../providers/apiProvider";

const SearchResults = ({
  movies,
  searchTerm,
  setSearchResults,
  totalResults,
  currentPage,
}) => {
  const [page, setPage] = useState(1);

  if (searchTerm.length === 0) return null;
  if (searchTerm.length > 0 && !movies) return <Loading />;

  if (searchTerm.length > 14) searchTerm = searchTerm.slice(0, 14) + "...";

  // Add more movies to the results
  const addResults = async () => {
    console.log("Add results called");
    setPage((p) => p + 1);

    await getSearchResults(searchTerm, page + 1).then(([response, _]) =>
      setSearchResults((results) => results.concat(response))
    );
  };

  return (
    <div className="px-8 max-w-[1440px] m-auto">
      <h1 className="my-4 text-lg font-bold text-white sm:text-xl">
        Showing results {Math.max(0, (currentPage - 1) * 20)} -{" "}
        {Math.min(totalResults, currentPage * 20)} of {totalResults} search
        results for "{searchTerm}"
      </h1>
      <div className="grid h-full grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {movies.map((movie) => (
          <SearchResult movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
