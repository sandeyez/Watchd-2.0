import { Field } from "formik";

const Input = ({
  type = "text",
  label,
  errorMessage = "",
  required = false,
  ...otherProps
}) => {
  return (
    <div className="text-left">
      <div className="flex space-x-1">
        <h1 className="font-bold">{label}</h1>
        {required && (
          <h1
            className="text-red-400 cursor-default"
            title="This field is required"
          >
            *
          </h1>
        )}
      </div>
      <Field
        type={type}
        className="px-4 py-2 text-sm rounded-lg w-96 bg-darkBlue"
        {...otherProps}
      />
      {errorMessage && (
        <h1 className="mt-1 text-xs text-red-400">{errorMessage}</h1>
      )}
    </div>
  );
};

export default Input;
