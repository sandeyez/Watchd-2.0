import "../styles/globals.css";
import Nav from "../components/Main/Navigation Bar/Nav";
import NextNprogress from "nextjs-progressbar";
import Footer from "../components/Main/Footer";
import { UserDataProvider } from "./../contexts/UserDataContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserDataProvider>
        <NextNprogress
          color="#1fd2ff"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={false}
          options={{ showSpinner: false }}
        />
        <Toaster />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </UserDataProvider>
    </AuthProvider>
  );
}

export default MyApp;
