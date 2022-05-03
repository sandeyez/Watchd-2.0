import { getProviderLogo } from "./../../utils/movie";
import { useState } from "react";

const WatchProvidersBody = ({ providers, country }) => {
  if (!(country in providers) || !("flatrate" in providers[country]))
    return (
      <div className="flex items-center justify-center w-full h-20">
        <h1 className="text-sm">
          You cannot stream this movie in your country yet
        </h1>
      </div>
    );

  return (
    <>
      <div className="flex gap-4">
        {providers[country]["flatrate"].map((provider) => (
          <WatchProvider
            logoPath={provider.logo_path}
            name={provider.provider_name}
            key={provider.provider_id}
          />
        ))}
      </div>
      <span className="mr-2 text-xs text-gray-400">Data provided by</span>
      <a href="https://www.justwatch.com">
        <img
          className="inline h-3 cursor-pointer"
          src="/justWatch.webp"
          alt=""
        />
      </a>
    </>
  );
};

export default WatchProvidersBody;

const WatchProvider = ({ logoPath, name }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="relative flex flex-col gap-2">
      <img
        className="w-16 h-16 rounded-2xl"
        src={getProviderLogo(logoPath)}
        alt=""
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <div className="absolute px-2 text-sm text-black bg-white w-max left-3/4 top-full">
          {name}
        </div>
      )}
    </div>
  );
};
