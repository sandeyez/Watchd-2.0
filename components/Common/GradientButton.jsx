const GradientButton = ({ text }) => {
  return (
    <button className="flex items-center justify-center w-full py-2 text-sm font-bold rounded-full bg-gradient-to-r from-pink to-lightBlue hover:from-pink/80 hover:to-lightBlue/80">
      {text}
    </button>
  );
};

export default GradientButton;
