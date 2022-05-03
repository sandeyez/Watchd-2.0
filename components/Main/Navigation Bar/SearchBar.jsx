import { GoSearch } from "react-icons/go";
import useScreenWidth from "./../../../hooks/useScreenWidth";
import { useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const render = useScreenWidth("min", 1280);
  const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();
    if (searchTerm < "\u0020" + 1) return;
    setSearchTerm("");
    router.push("/search?q=" + searchTerm);
  };

  if (!render) return <div></div>;

  return (
    <form className="relative flex justify-center h-full">
      <input
        type="text"
        placeholder="Search for movies to watch..."
        className="w-full p-4 my-auto text-sm rounded-full h-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="absolute h-full right-3"
        onClick={(e) => onSearch(e)}
      >
        <GoSearch />
      </button>
    </form>
  );
};

export default SearchBar;
