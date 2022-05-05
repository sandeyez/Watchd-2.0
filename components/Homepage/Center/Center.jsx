import Feed from "./Feed";
import Auth from "./../Auth/Auth";
import Loading from "../../Main/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "../../../config/firebase";

const Center = () => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  console.log(user && true);

  if (loading) return <Loading />;

  return user ? <Feed /> : <Auth />;
};

export default Center;
