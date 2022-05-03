const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 hidden p-2 text-xs text-gray-500 xl:block">
      <h1>Data provided by</h1>
      <img
        className="inline cursor-pointer"
        src="/tmdb.svg"
        alt=""
        onClick={() => window.open("http://tmdb.org")}
      />
    </div>
  );
};

export default Footer;
