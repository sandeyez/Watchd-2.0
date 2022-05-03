import Login from "./Login";
import { useState } from "react";

const Auth = () => {
  const [loginSelected, setLoginSelected] = useState(true);

  return <>{loginSelected ? <Login /> : <SignUp />}</>;
};

export default Auth;
