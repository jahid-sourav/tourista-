import Loading from "@/components/custom-components/Loading";
import SpotCard from "@/components/custom-components/SpotCard";
import TitlePage from "@/components/custom-components/TitlePage";
import { useAllSpotsData } from "@/hooks/useFetchSpotsData";
import { useState } from "react";

const AllSpot = () => {
  const [sort, setSort] = useState("");
  const { data: spots, isLoading, isFetching, error } = useAllSpotsData(sort);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  if (isLoading || isFetching) {
    return (
      <div className="py-5">
        <Loading size={50} color="green" />
      </div>
    );
  }
  if (error) {
    return <p>Error Loading Data</p>;
  }

  return (
    <section className="py-6">
      <TitlePage title="All Spot" />
      <h1 className="font-bold text-2xl mb-6 text-center">All Spots</h1>
      <div className="text-center mb-10">
        <select
          value={sort}
          onChange={handleSortChange}
          className="p-2 rounded bg-green-500 outline-0"
        >
          <option value="" disabled>
            Sort By Average Cost
          </option>
          <option value="lowToHigh">Low To High</option>
          <option value="highToLow">High To Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spots.map((item) => (
          <SpotCard
            key={item?._id}
            image={item?.spot_image_url}
            title={item?.spot_name}
            link={`/spots/${item?._id}`}
          >
            <span className="font-semibold text-lg">
              ${item?.spot_average_cost}
            </span>
          </SpotCard>
        ))}
      </div>
    </section>
  );
};

export default AllSpot;
