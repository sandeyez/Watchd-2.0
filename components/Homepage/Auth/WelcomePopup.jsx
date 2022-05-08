import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Input from "../../Common/Input";
import { Formik } from "formik";
import { Form } from "formik";
import * as Yup from "yup";
import GradientButton from "./../../Common/GradientButton";
import { queryDatabase } from "../../../config/firebase";
import Loading from "./../../Main/Loading";

function WelcomePopup({ onFormSubmit }) {
  const { user, changeUsername } = useAuth();

  async function onSubmit(username, { setSubmitting, setErrors }) {
    console.log("Submitting", username);
    const users = await queryDatabase("Users", "username", "==", username);

    if (users.length > 0)
      setErrors({ username: "This username is already taken" });
    else {
      await changeUsername(username).then(() => onFormSubmit());
    }

    setSubmitting(false);
  }

  return (
    <div className="flex flex-col items-center text-center text-white max-w-[560px] p-4">
      <h1 className="text-3xl font-bold">Hey, {user.displayName}!</h1>
      <div className="flex items-center space-x-1 text-lg text-white">
        <p>Welcome to</p>
        <img src="/watchd_logo.svg" alt="watchd" className="h-8" />
      </div>
      <div className="flex flex-col space-y-2 text-sm text-grey">
        <p>
          Watchd is an online platform where you can keep track of the movies
          you watched and the ones you still want to watch.
        </p>
        <p>
          You can follow your friends and see what they've watched, and discover
          new titles.
        </p>
      </div>

      <p className="my-2">Please enter a username you want to use on watchd:</p>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(6, "Please enter at least 6 characters")
            .max(12, "Please enter at most 12 characters")
            .required("Please enter a username"),
        })}
        onSubmit={({ username }, actions) => {
          onSubmit(username, actions);
        }}
      >
        {({ errors, touched, isValidating, isSubmitting }) => (
          <Form>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  autoFocus
                  placeholder="Enter your username..."
                  name="username"
                  errorMessage={touched.username ? errors.username : null}
                />
              </div>
            </div>
            <div className="w-48 m-auto mt-2 mini:px-12 mini:w-72">
              <GradientButton
                type="submit"
                text="Sign up"
                disabled={isValidating || isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default WelcomePopup;
