import { useState, useEffect } from "react";
import { getCast } from "../../providers/apiProvider";
import Loading from "../Main/Loading";
import { getActorPicture } from "../../utils/movie";
import { useRouter } from "next/router";
import { routeActor } from "./../../utils/actors";

const Cast = ({ id }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    const data = await getCast(id);
    setCast(data.slice(0, 10));
  }
  if (!cast) {
    return <Loading />;
  }

  return (
    <div className="col-span-2 sm:col-span-1">
      <h1 className="text-xl font-bold">Cast</h1>
      <div className="grid grid-cols-1 gap-4 mt-2 mini:grid-cols-2 sm:grid-cols-1 auto-rows-max">
        {cast.map((actor) => (
          <CastMember
            profilePath={actor.profile_path}
            name={actor.name}
            character={actor.character}
            id={actor.id}
            key={actor.id}
          />
        ))}
      </div>
    </div>
  );
};

const CastMember = ({ profilePath, name, character, id }) => {
  const router = useRouter();
  return (
    <div className="grid gap-2 grid-cols-[50px_auto]">
      <div className="h-full overflow-hidden aspect-square">
        <img
          className="object-cover w-12 rounded-full aspect-square"
          src={getActorPicture(profilePath)}
          alt=""
        />
      </div>
      <div>
        <h1
          className="font-bold cursor-pointer breakWord"
          onClick={() => routeActor(router, id)}
        >
          {name}
        </h1>
        <h1 className="text-sm">{character}</h1>
      </div>
    </div>
  );
};

export default Cast;
