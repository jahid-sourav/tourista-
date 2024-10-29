import Loading from "@/components/custom-components/Loading";
import TitlePage from "@/components/custom-components/TitlePage";
import { useASpotData } from "@/hooks/useFetchSpotsData";
import { useParams } from "react-router";

const SpotDetail = () => {
  const { id } = useParams();
  const { data: spot, isLoading, error } = useASpotData(id);
  if (isLoading) {
    return (
      <div className="py-3">
        <Loading size={60} color="green" />
      </div>
    );
  }
  if (error) {
    return <p>Error Loading Data</p>;
  }

  return (
    <section className="py-6">
      <TitlePage title="Spot Details" />
      <div className="container">
        <div className="flex justify-center">
          <img src={spot?.spot_image_url} alt="Image" className="rounded" />
        </div>
        <div className="text-center mt-4">
          <p className="mb-2 text-lg font-semibold">
            Spot Name : {spot?.spot_name}
          </p>
          <p className="mb-2 text-lg font-semibold">
            Country : {spot?.spot_country}
          </p>
          <p className="mb-2 text-lg font-semibold">
            Average Cost : ${spot?.spot_average_cost}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpotDetail;
