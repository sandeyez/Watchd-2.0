import { useEffect, useState } from "react";
import { getCountry } from "../providers/apiProvider";

const useLocation = () => {
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getCountryFromCoords(position);
        },
        () => setCountry("US")
      );
    } else setCountry("US");
  }, []);

  const getCountryFromCoords = async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    await getCountry(lat, lng).then((res) => {
      setCountry(res);
    });
  };

  return country;
};

export default useLocation;
