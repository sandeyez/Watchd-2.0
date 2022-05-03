import { useRouter } from "next/router";
const SideHeader = ({ title, option, optionUrl }) => {
  const router = useRouter();

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">{title}</h1>
        <h1
          className="block font-bold cursor-pointer md:hidden text-lightBlue xl:block"
          onClick={() => router.push(optionUrl)}
        >
          {option.toUpperCase()}
        </h1>
      </header>
      <hr className="w-1/2 m-auto mt-2 mb-4" />
    </>
  );
};

export default SideHeader;
