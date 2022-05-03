import Center from "../components/Homepage/Center/Center";
import Watchlist from "../components/Homepage/Side/Watchlist";
import Popular from "../components/Homepage/Side/Popular";
import Head from "next/head";
import useScreenWidth from "../hooks/useScreenWidth";

export default function Home() {
  const horizontalView = useScreenWidth("max", 870);

  return (
    <div className="p-8 md:p-0 grid h-full grid-rows-[230px_auto] md:grid-rows-1 text-white max-w-[1024px] xl:max-w-[1440px] m-auto grid-cols-1 md:grid-cols-[140px_5fr_140px] xl:grid-cols-[2fr_5fr_2fr] remainingScreenHeight gap-10">
      <Head>
        <title>Watchd.</title>
      </Head>
      {!horizontalView && <Watchlist />}
      {horizontalView ? (
        <>
          <Popular />
          <Center />
        </>
      ) : (
        <>
          <Center />
          <Popular />
        </>
      )}
    </div>
  );
}
