import SideHeader from "./SideHeader";
import { getPopularMovies } from "./../../../providers/apiProvider";
import SideBody from "./SideBody";

const Popular = () => {
  const EmptyComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full text-xs text-center">
        <p className="font-bold">
          There has been an error loading the popular movies
        </p>
        <p>Please try again later</p>
      </div>
    );
  };
  return (
    <div className="p-6 overflow-x-scroll overflow-y-hidden md:overflow-x-hidden bg-gradient-to-t md:bg-gradient-to-l from-darkBlue to-regularBlue rounded-2xl md:rounded-tl-2xl">
      <SideHeader title="Popular" option="more" optionUrl={"/discover"} />
      <SideBody
        fetchFunction={getPopularMovies}
        EmptyComponent={EmptyComponent}
      />
    </div>
  );
};

export default Popular;
