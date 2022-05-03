import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();

  return (
    <img
      src="/watchd_logo.svg"
      alt="Watchd logo"
      className="object-contain h-full py-3 cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
