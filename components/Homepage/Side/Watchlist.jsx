import SideHeader from "./SideHeader";
import SideCard from "./SideCard";
const Watchlist = () => {
  return (
    <div className="h-[180px] md:h-auto p-6 bg-gradient-to-t md:bg-gradient-to-r from-darkBlue to-regularBlue rounded-tr-2xl overflow-y-scroll">
      <SideHeader title="Watchlist" option="all" optionUrl={"/watchlist"} />
      <SideCard />
    </div>
  );
};

export default Watchlist;
