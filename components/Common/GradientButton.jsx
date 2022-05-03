const GradientButton = ({ text, ...otherProps }) => {
  return (
    <button
      className="flex items-center justify-center w-full py-2 text-sm font-bold transition duration-300 ease-in-out rounded-full bg-gradient-to-r from-pink to-lightBlue hover:from-pink/80 hover:to-lightBlue/80 disabled:opacity-70 disabled:hover:from-pink disabled:hover:to-lightBlue hover:scale-105 disabled:hover:scale-100"
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default GradientButton;
