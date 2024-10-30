import Loading from "@/components/custom-components/Loading";
import SpotCard from "@/components/custom-components/SpotCard";
import TitlePage from "@/components/custom-components/TitlePage";
import { useSpotsDataByCountry } from "@/hooks/useFetchSpotsData";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const SpotsByCountry = () => {
  const { countryName } = useParams();
  const {
    data: touristsSpots,
    isLoading,
    error,
  } = useSpotsDataByCountry(countryName);

  if (isLoading) {
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
    <section className="py-5">
      <TitlePage title={`${countryName}`} />
      {touristsSpots.length === 0 ? (
        <div className="text-center">
          <p className="text-center font-bold text-2xl mb-5">No Data Add Yet</p>
          <Link className="secondary-button" to="/add-spot">
            Create A Tourist Spot
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {touristsSpots.map((item) => (
            <SpotCard
              key={item?._id}
              image={item?.spot_image_url}
              title={item?.spot_name}
              link={`/spots/${item?._id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SpotsByCountry;
