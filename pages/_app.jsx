import "../styles/globals.css";
import Nav from "../components/Main/Navigation Bar/Nav";
import NextNprogress from "nextjs-progressbar";
import Footer from "../components/Main/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="#1fd2ff"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={false}
        options={{ showSpinner: false }}
      />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
