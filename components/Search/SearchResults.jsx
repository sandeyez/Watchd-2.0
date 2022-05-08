import Loading from "../Main/Loading";
import SearchResult from "./SearchResult";
import { getSearchResults } from "../../providers/apiProvider";
import { useRef, useEffect, useState } from "react";
import RegularButton from "./../Common/RegularButton";
import { AiOutlineReload } from "react-icons/ai";
import { IoChevronUp } from "react-icons/io5";

const SearchResults = ({
  movies,
  searchTerm,
  setSearchResults,
  totalResults,
  currentPage,
}) => {
  const [page, setPage] = useState(1);
  const [loadingResults, setLoadingResults] = useState(false);

  const topRef = useRef();

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

  async function onShowMoreResults() {
    setLoadingResults(true);
    await addResults();
    setLoadingResults(false);
  }

  return (
    <>
      <div className="px-8 max-w-[1440px] m-auto">
        <h1
          className="my-4 text-lg font-bold text-white sm:text-xl"
          ref={topRef}
        >
          Showing {totalResults} search results for "{searchTerm}"
        </h1>
        <div className="grid h-full grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {movies.map((movie) => (
            <SearchResult movie={movie} key={movie.id} />
          ))}
        </div>
        <div className="w-64 m-auto my-10">
          {loadingResults ? (
            <Loading />
          ) : (
            totalResults > movies.length && (
              <RegularButton
                text="Show more results"
                onClick={onShowMoreResults}
              >
                <AiOutlineReload />
              </RegularButton>
            )
          )}
        </div>
      </div>
      <div
        title="Scroll to top"
        className="absolute flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer bg-gradient-to-br from-pink to-lightBlue right-8 bottom-8"
        onClick={() =>
          topRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      >
        <IoChevronUp size={32} color="white" />
      </div>
    </>
  );
};

export default SearchResults;
