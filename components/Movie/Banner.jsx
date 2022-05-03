import { getMovieBackdrop } from "../../utils/movie";

const Banner = ({ backdropPath }) => {
  return (
    <div className="absolute left-0 z-10 hidden overflow-hidden h-96 mini:block">
      <div className="absolute w-screen bg-gradient-to-b h-96 from-darkBlue/40 to-darkBlue"></div>
      <img
        className="object-cover w-screen"
        src={getMovieBackdrop(backdropPath)}
        alt=""
      />
    </div>
  );
};

export default Banner;
