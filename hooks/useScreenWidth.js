import { useEffect, useState } from "react";

export default function useScreenWidth(option, width) {
  const [render, setRender] = useState();

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onResize = () => {
    const screenWidth = window.innerWidth;

    switch (option) {
      case "min": {
        if (screenWidth >= width) {
          setRender(true);
        } else {
          setRender(false);
        }
        break;
      }
      case "max": {
        if (screenWidth < width) setRender(true);
        else setRender(false);
        break;
      }
    }
  };

  return render;
}
