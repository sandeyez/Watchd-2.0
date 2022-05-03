import Login from "./Login";
import SignUp from "./SignUp";
import { useState } from "react";

const Auth = () => {
  const [loginSelected, setLoginSelected] = useState(true);

  return (
    <>
      {loginSelected ? (
        <Login togglePage={() => setLoginSelected(false)} />
      ) : (
        <SignUp togglePage={() => setLoginSelected(true)} />
      )}
    </>
  );
};

export default Auth;
