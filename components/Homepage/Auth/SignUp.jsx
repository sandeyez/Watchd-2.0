import { useAuth } from "../../../contexts/AuthContext";
import RegularButton from "./../../Common/RegularButton";
import SignUpForm from "./Forms/SignUpForm";

const SignUp = ({ togglePage }) => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8 py-16 text-center sm:p-16 bg-regularBlue rounded-t-xl md:py-0">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl gradientText">
          Welcome to watchd.
        </h1>
        <h1 className="text-xs text-grey sm:text-sm">
          Keep track of your watchlist and your friends' activity.
        </h1>
      </div>
      <div className="flex flex-col w-48 gap-4 mini:w-72">
        <RegularButton text="Sign up with Google" onClick={signInWithGoogle}>
          <img src="/google.svg" alt="" />
        </RegularButton>
      </div>
      <div className="flex items-center justify-center w-full gap-2 ">
        <hr className="w-1/3 sm:w-1/4" />
        <h1>Or</h1>
        <hr className="w-1/3 sm:w-1/4" />
      </div>
      <SignUpForm />
      <div className="items-center gap-1 text-xs">
        <span>Already have an account? </span>
        <span
          className="font-bold underline cursor-pointer"
          onClick={togglePage}
        >
          Log in
        </span>
      </div>
    </div>
  );
};

export default SignUp;
