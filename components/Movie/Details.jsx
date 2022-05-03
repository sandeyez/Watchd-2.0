import { formatDuration, getReleaseYear } from "../../utils/movie";

const Details = ({ title, tagline, releaseDate, duration }) => {
  return (
    <div className="flex flex-col justify-end col-span-2 text-sm text-center mini:text-left sm:text-base mini:col-span-1">
      <h1 className="text-2xl font-bold sm:text-3xl gradientText ">{title}</h1>
      {tagline && <h1 className="italic font-light ">"{tagline}"</h1>}
      <div>
        <span>{getReleaseYear(releaseDate)}</span>
        {duration && releaseDate && <span> ● </span>}
        {duration && <span>{formatDuration(duration)}</span>}
      </div>
    </div>
  );
};

export default Details;
