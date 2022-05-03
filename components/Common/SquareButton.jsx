const SquareButton = ({ children, ...otherProps }) => {
  return (
    <div
      className="absolute flex items-center justify-center w-8 p-2 rounded-lg cursor-pointer lg:w-10 aspect-square bg-regularBlue/80 hover:bg-regularBlue/100"
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default SquareButton;
