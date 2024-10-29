import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllSpotsData = async () => {
  const { data } = await axios.get(`http://localhost:5000/spots`);
  return data;
};
const fetchSpotsDataByEmail = async (email) => {
  const { data } = await axios.get(`http://localhost:5000/spots/${email}`);
  return data;
};

const useAllSpotsData = () => {
  return useQuery({
    queryKey: ["spots"],
    queryFn: fetchAllSpotsData,
  });
};
const useSpotsDataByEmail = (email) => {
  return useQuery({
    queryKey: ["touristSpots", email],
    queryFn: () => fetchSpotsDataByEmail(email),
  });
};

export { useAllSpotsData, useSpotsDataByEmail };
