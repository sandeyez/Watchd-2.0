import { getProviderLogo } from "./../../utils/movie";

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
  return (
    <div className="relative flex flex-col gap-2" title={name}>
      <img
        className="w-16 h-16 rounded-2xl"
        src={getProviderLogo(logoPath)}
        alt=""
      />
    </div>
  );
};
