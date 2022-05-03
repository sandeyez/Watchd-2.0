import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import GradientButton from "../../../Common/GradientButton";
import Input from "../../../Common/Input";

function SignUpForm() {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Please enter at least 6 characters")
      .max(20, "Please enter at most 20 characters")
      .required("Please enter a username"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email or username"),
    password: Yup.string()
      .min(8, "Please enter at least 8 characters")
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Two passwords must match"),
  });

  function handleLogin(email, password) {
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
            placeholder="Enter your username..."
            label="Username:"
            name="username"
            errorMessage={touched.username ? errors.username : null}
            required
          />
          <Input
            placeholder="Enter your email..."
            label="Email:"
            name="email"
            errorMessage={touched.email ? errors.email : null}
            type="email"
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
          <Input
            placeholder="Confirm your password..."
            label="Confirm password:"
            type="password"
            name="confirmPassword"
            errorMessage={
              touched.confirmPassword ? errors.confirmPassword : null
            }
            required
          />
          <div className="m-auto w-72">
            <GradientButton
              text="Sign up"
              disabled={isValidating || isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
