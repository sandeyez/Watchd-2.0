import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import GradientButton from "./../../../Common/GradientButton";
import Input from "./../../../Common/Input";
import { logInWithEmailAndPassword } from "../../../../config/firebase";

function LoginForm() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email or username"),
    password: Yup.string()
      .min(8, "Please enter at least 8 characters")
      .required("Please enter your password"),
  });

  function handleLogin(email, password) {
    logInWithEmailAndPassword(email, password);
    console.log(email, password);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={({ email, password }) => handleLogin(email, password)}
    >
      {({ errors, touched, isValidating, isSubmitting }) => (
        <Form className="flex-col items-center space-y-4">
          <Input
            placeholder="Enter your email..."
            label="Email:"
            name="email"
            type="email"
            errorMessage={touched.email ? errors.email : null}
            required
          />
          <Input
            placeholder="Enter your password..."
            label="Password:"
            type="password"
            name="password"
            errorMessage={touched.password ? errors.password : null}
            required
          />
          <div className="w-48 m-auto mini:px-12 mini:w-72">
            <GradientButton
              text="Log in"
              disabled={isValidating || isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
