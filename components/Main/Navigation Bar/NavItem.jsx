const NavItem = ({ children, ...otherProps }) => {
  return (
    <div
      className="flex flex-row-reverse items-center gap-2 font-semibold cursor-pointer md:flex-row"
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default NavItem;
