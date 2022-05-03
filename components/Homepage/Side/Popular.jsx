import SideHeader from "./SideHeader";
import { getPopularMovies } from "./../../../providers/apiProvider";
import SideBody from "./SideBody";

const Popular = () => {
  return (
    <div className="p-6 overflow-x-scroll overflow-y-hidden md:overflow-x-hidden bg-gradient-to-t md:bg-gradient-to-l from-darkBlue to-regularBlue rounded-2xl md:rounded-tl-2xl">
      <SideHeader title="Popular" option="more" optionUrl={"/discover"} />
      <SideBody fetchFunction={getPopularMovies} />
    </div>
  );
};

export default Popular;
