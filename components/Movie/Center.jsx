import Description from "./Description";
import WatchProviders from "./WatchProviders";
import Recommendations from "./Recommendations";
const Center = ({ description, id, collection }) => {
  return (
    <div className="flex flex-col col-span-2 gap-4 mb-8 sm:col-span-1">
      <Description description={description} />
      <WatchProviders id={id} />
      <Recommendations collection={collection} movieID={id} />
    </div>
  );
};

export default Center;
