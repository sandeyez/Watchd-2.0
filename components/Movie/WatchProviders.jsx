import { useState, useEffect } from "react";
import { getWatchProviders } from "../../providers/apiProvider";
import Loading from "../Main/Loading";
import useLocation from "./../../hooks/useLocation";
import WatchProvidersBody from "./WatchProvidersBody";

const WatchProviders = ({ id }) => {
  const [providers, setProviders] = useState({});
  const location = useLocation();
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    setCountry(location);
  }, [location]);

  const fetchData = async () => {
    const data = await getWatchProviders(id);
    setProviders(data);
  };

  if (!providers) {
    return <Loading />;
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Where to watch?</h1>
        <ChangeRegion country={country} />
      </header>
      <WatchProvidersBody providers={providers} country={country} />
      <div className="grid w-full grid-cols-3 gap-2 font-light"></div>
    </div>
  );
};

export default WatchProviders;

const ChangeRegion = ({ country }) => {
  return (
    <div className="flex items-center gap-2 p-3 rounded-md cursor-pointer bg-regularBlue">
      <img
        className="h-4 rounded-sm"
        src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
        alt=""
      />
      <h1 className="hidden w-auto text-xs font-bold mini:block">
        Change Region
      </h1>
    </div>
  );
};
