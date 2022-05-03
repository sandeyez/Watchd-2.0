import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";

const SearchBar = ({ setSearchTerm, searchTerm }) => {
  const [input, setInput] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(input), 300);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="relative w-full">
      <input
        className="block w-full py-4 pl-8 pr-16 font-semibold text-white xl:hidden bg-regularBlue caret-white placeholder:font-normal"
        type="text"
        placeholder="Search for movies to watch..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <MdSearch className="absolute top-0 w-8 h-full text-white right-6 " />
    </div>
  );
};

export default SearchBar;
