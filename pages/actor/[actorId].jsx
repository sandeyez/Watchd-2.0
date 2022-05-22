import { useEffect, useState } from "react";
import { getActor } from "../../providers/apiProvider";
import { getActorPicture } from "../../utils/actors";
import Loading from "./../../components/Main/Loading";
import Head from "next/head";
import Image from "next/image";

function Actor({ actorId }) {
  const [actor, setActor] = useState();

  useEffect(() => {
    fetchData();
  }, [actorId]);

  async function fetchData() {
    const data = await getActor(actorId);
    setActor(data);
    console.log(data);
  }

  if (!actor) {
    return <Loading />;
  }

  return (
    <div className="z-20 grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_3fr_1fr] max-w-[1024px] xl:max-w-[1250px] mt-4 sm:mt-8 md:mt-16 gap-6 text-white left-0 right-0 m-auto px-8">
      <Head>
        <title>{actor.name} | Watchd.</title>
      </Head>
      <div className="w-full h-full">
        <img
          src={getActorPicture(actor.profile_path)}
          className="object-cover w-full"
        />
      </div>
      <div className="flex flex-col justify-end">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl gradientText ">
            {actor.name}
          </h1>
        </div>
        <h1>
          {actor.birthday} {actor.deathday ? `- ${actor.deathday}` : ""}
        </h1>
        <h1 className="text-grey">{actor.place_of_birth}</h1>
      </div>

      <p className="col-span-3">{actor.biography}</p>
    </div>
  );
}

export default Actor;

export function getServerSideProps(ctx) {
  try {
    const { actorId } = ctx.query;
    return { props: { actorId: parseInt(actorId) } };
  } catch (error) {
    return { notFound: true };
  }
}
