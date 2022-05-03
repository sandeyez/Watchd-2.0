import Head from "next/head";

// Render the 404: Page not found page
const Error404 = () => {
  return (
    <>
      <Head>
        <title>Page not found | Watchd.</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full font-bold text-white remainingScreenHeight">
        <h1 className="text-8xl">404</h1>
        <h1 className="text-3xl gradientText"> This page does not exist</h1>
      </div>
    </>
  );
};

export default Error404;
