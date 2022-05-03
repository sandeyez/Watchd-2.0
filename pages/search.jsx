import SearchBar from "./../components/Search/SearchBar";
import { useState, useEffect } from "react";
import { getSearchResults } from "../providers/apiProvider";
import SearchResults from "../components/Search/SearchResults";

const Search = ({ query }) => {
  const [searchTerm, setSearchTerm] = useState(query);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) fetchData();
    const url = new URL(window.location);
    url.searchParams.set("q", searchTerm);
    window.history.pushState(null, "", url.toString());
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const fetchData = async () => {
    console.log("Fetching data for", searchTerm);
    const data = await getSearchResults(searchTerm);
    setSearchResults(data);
  };

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <SearchResults movies={searchResults} searchTerm={searchTerm} />
    </div>
  );
};

export default Search;

export function getServerSideProps(ctx) {
  const query = "q" in ctx.query ? ctx.query.q : "";

  return { props: { query } };
}
