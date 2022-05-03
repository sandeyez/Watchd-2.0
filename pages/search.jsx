import SearchBar from "./../components/Search/SearchBar";
import { useState, useEffect } from "react";
import { getSearchResults } from "../providers/apiProvider";
import SearchResults from "../components/Search/SearchResults";
import SearchPagination from "../components/Search/SearchPagination";

const Search = ({ query, page }) => {
  const [searchTerm, setSearchTerm] = useState(query);
  const [searchPage, setSearchPage] = useState(page);
  const [searchResults, setSearchResults] = useState(null);
  const [totalResults, setTotalResults] = useState();
  const [pages, setPages] = useState();

  useEffect(() => {
    if (searchTerm.length > 0) fetchData();

    const url = new URL(window.location);
    url.searchParams.set("q", searchTerm);
    window.history.pushState(null, "", url.toString());

    url.searchParams.set("page", searchPage);
    window.history.pushState(null, "", url.toString());
  }, [searchTerm, searchPage]);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const fetchData = async () => {
    const [data, numberOfResults, numberOfPages] = await getSearchResults(
      searchTerm,
      searchPage
    );

    setSearchResults(data);
    setTotalResults(numberOfResults);
    setPages(numberOfPages);
  };

  async function handlePageSelect(page) {
    setSearchPage(page);
    console.log(page);
  }

  if (searchResults === null) return null;

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResults
        movies={searchResults}
        searchTerm={searchTerm}
        setSearchResults={setSearchResults}
        totalResults={totalResults}
        currentPage={searchPage}
      />
      <SearchPagination
        currentPage={searchPage}
        totalPages={pages}
        onPageSelect={handlePageSelect}
      />
    </>
  );
};

export default Search;

export function getServerSideProps(ctx) {
  let query = "q" in ctx.query ? ctx.query.q : "";
  let page = "page" in ctx.query ? Number(ctx.query.page) : 1;

  if (!Number.isInteger(Number(page)) || Number(page) < 1) page = 1;

  return { props: { query, page } };
}
