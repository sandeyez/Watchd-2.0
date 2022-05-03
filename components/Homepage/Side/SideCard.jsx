import { getMoviePoster, routeMovie } from "../../../utils/movie";
import { useRouter } from "next/router";

const SideCard = ({ title, year, posterPath, id }) => {
  const router = useRouter();

  const onClick = () => {
    routeMovie(router, id);
  };

  return (
    <div className="flex gap-4">
      <img
        className="w-20 h-32 rounded-md cursor-pointer"
        src={getMoviePoster(posterPath)}
        onClick={onClick}
      />
      <div className="hidden overflow-hidden xl:block">
        <h1
          className="font-bold cursor-pointer text-md line-clamp-3"
          onClick={onClick}
        >
          {title}
        </h1>
        <h1 className="text-sm">{year}</h1>
      </div>
    </div>
  );
};

export default SideCard;
