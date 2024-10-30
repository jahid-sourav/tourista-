import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchAllSpotsData = async () => {
//   const { data } = await axios.get(`http://localhost:5000/spots`);
//   return data;
// };

const fetchAllSpotsData = async (sort) => {
  const { data } = await axios.get(`http://localhost:5000/spots`, {
    params: { sort },
  });
  return data;
};
const fetchSpotsDataByEmail = async (email) => {
  const { data } = await axios.get(`http://localhost:5000/tourSpots/${email}`);
  return data;
};
const fetchASpotData = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/spots/${id}`);
  return data;
};

// const useAllSpotsData = () => {
//   return useQuery({
//     queryKey: ["spots"],
//     queryFn: fetchAllSpotsData,
//   });
// };

const useAllSpotsData = (sort) => {
  return useQuery({
    queryKey: ["spots", sort],
    queryFn: () => fetchAllSpotsData(sort),
  });
};
const useSpotsDataByEmail = (email) => {
  return useQuery({
    queryKey: ["touristSpots", email],
    queryFn: () => fetchSpotsDataByEmail(email),
  });
};
const useASpotData = (id) => {
  return useQuery({
    queryKey: ["spot", id],
    queryFn: () => fetchASpotData(id),
  });
};

export { useAllSpotsData, useASpotData, useSpotsDataByEmail };
