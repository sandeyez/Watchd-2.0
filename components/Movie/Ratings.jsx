import { useAuth } from "../../contexts/AuthContext";

const Ratings = ({ global }) => {
  const { user } = useAuth();
  return (
    <div className="col-span-2 md:col-span-1">
      <h1 className="text-xl font-bold">Ratings</h1>
      <div className="flex flex-row gap-4 md:flex-col md:gap-2">
        {user && (
          <>
            <RatingElement title="Your rating" rating={9.8} />
            <RatingElement title="Friends rating" rating={9.8} />
          </>
        )}
        <RatingElement title="Overall rating" rating={global} />
      </div>
    </div>
  );
};

export default Ratings;

const RatingElement = ({ title, rating }) => {
  return (
    <div>
      <h1>{title && title}</h1>
      <span className="text-3xl font-bold">{rating !== 0 ? rating : "-"}</span>
      <span className="hidden mini:inline">/10</span>
    </div>
  );
};
