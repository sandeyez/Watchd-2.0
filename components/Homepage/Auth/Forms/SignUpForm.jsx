import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import GradientButton from "../../../Common/GradientButton";
import Input from "../../../Common/Input";
import { useAuth } from "../../../../contexts/AuthContext";

function SignUpForm() {
  const { registerWithEmailAndPassword } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Please enter at least 6 characters")
      .max(12, "Please enter at most 12 characters")
      .required("Please enter a username"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email"),
    password: Yup.string()
      .min(8, "Please enter at least 8 characters")
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Two passwords must match"),
  });

  function handleLogin(username, email, password) {
    registerWithEmailAndPassword(username, email, password);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={({ username, email, password }) =>
        handleLogin(username, email, password)
      }
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
          <div className="w-48 m-auto mini:px-12 mini:w-72">
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
