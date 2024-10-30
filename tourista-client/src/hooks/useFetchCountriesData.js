import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllCountries = async () => {
  try {
    const { data } = await axios.get(
      "https://tourista-server-indol.vercel.app/countries"
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const useCountriesData = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  });
};

export default useCountriesData;
