const Input = ({ type = "text", label, ...otherProps }) => {
  return (
    <div className="text-left">
      <h1 className="font-bold">{label}</h1>
      <input
        type={type}
        className="px-4 py-2 text-sm rounded-l w-96 bg-darkBlue"
        {...otherProps}
      />
    </div>
  );
};

export default Input;
