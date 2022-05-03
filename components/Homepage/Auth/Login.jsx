import Input from "../../Common/Input";
import RegularButton from "./../../Common/RegularButton";
import GradientButton from "./../../Common/GradientButton";
import { Formik } from "formik";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-16 py-16 text-center bg-regularBlue rounded-t-xl md:py-0">
      <div>
        <h1 className="text-3xl font-bold gradientText">
          Welcome back to watchd.
        </h1>
        <h1 className="text-xs text-grey sm:text-base">
          Keep track of your watchlist and your friends' activity
        </h1>
      </div>
      <div className="flex flex-col gap-4 w-80">
        <RegularButton text="Log in with Google">
          <img src="/google.svg" alt="" />
        </RegularButton>
      </div>
      <div className="flex items-center justify-center w-full gap-2 ">
        <hr className="w-1/3 sm:w-1/4" />
        <h1>Or</h1>
        <hr className="w-1/3 sm:w-1/4" />
      </div>
      <Input placeholder="Enter your email..." label="Email:" />
      <Input
        placeholder="Enter your password..."
        label="Password:"
        type="password"
      />
      <div className="mt-4 w-72">
        <GradientButton text="Log in" />
      </div>
      <div className="flex items-center gap-1 text-xs">
        <span>Don't have an account yet?</span>
        <span className="font-bold underline cursor-pointer">Sign up</span>
      </div>
    </div>
  );
};

export default Login;
