import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchAllSpotsData = async () => {
//   const { data } = await axios.get(`https://tourista-server-indol.vercel.app/spots`);
//   return data;
// };

const fetchAllSpotsData = async (sort) => {
  const { data } = await axios.get(
    `https://tourista-server-indol.vercel.app/spots`,
    {
      params: { sort },
    }
  );
  return data;
};
const fetchSpotsDataByEmail = async (email) => {
  const { data } = await axios.get(
    `https://tourista-server-indol.vercel.app/tourSpots/${email}`
  );
  return data;
};
const fetchSpotsDataByCountry = async (country) => {
  const { data } = await axios.get(
    `https://tourista-server-indol.vercel.app/tourSpotsByCountry/${country}`
  );
  return data;
};
const fetchASpotData = async (id) => {
  const { data } = await axios.get(
    `https://tourista-server-indol.vercel.app/spots/${id}`
  );
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
const useSpotsDataByCountry = (country) => {
  return useQuery({
    queryKey: ["touristsSpots", country],
    queryFn: () => fetchSpotsDataByCountry(country),
  });
};
const useASpotData = (id) => {
  return useQuery({
    queryKey: ["spot", id],
    queryFn: () => fetchASpotData(id),
  });
};

export {
  useAllSpotsData,
  useASpotData,
  useSpotsDataByCountry,
  useSpotsDataByEmail,
};
