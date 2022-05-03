import Loading from "../Main/Loading";
import SearchResult from "./SearchResult";

const SearchResults = ({ movies, searchTerm }) => {
  if (searchTerm.length === 0) return null;
  if (searchTerm.length > 0 && !movies) return <Loading />;

  if (searchTerm.length > 14) searchTerm = searchTerm.slice(0, 14) + "...";

  return (
    <div className="px-8 max-w-[1440px] m-auto py-2">
      <h1 className="text-lg font-bold text-white sm:text-xl">
        Showing search results for "{searchTerm}"
      </h1>
      <div className="grid grid-cols-2 gap-4 my-2 mini:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 ">
        {movies.map((movie) => (
          <SearchResult movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
