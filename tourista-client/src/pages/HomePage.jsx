import Loading from "@/components/custom-components/Loading";
import SpotCard from "@/components/custom-components/SpotCard";
import TitlePage from "@/components/custom-components/TitlePage";
import useCountriesData from "@/hooks/useFetchCountriesData";
import { useAllSpotsData } from "@/hooks/useFetchSpotsData";

const HomePage = () => {
  const { data: spots, isLoading, error } = useAllSpotsData();
  const { data: countries, isLoading: loading } = useCountriesData();

  // Check if spots is available before slicing
  const latestSpots = spots ? spots.slice(0, 6) : [];

  if (isLoading || loading) {
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
      <TitlePage title="Home" />
      <div className="container">
        <h1 className="mb-5 font-bold text-2xl">Latest Tourist Spots</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestSpots.map((item) => (
            <SpotCard
              key={item?._id}
              image={item?.spot_image_url}
              title={item?.spot_name}
              link={`/spots/${item?._id}`}
            />
          ))}
        </div>
        <div className="mt-8">
          <h1 className="mb-5 font-bold text-2xl">Tourist Spots By Country</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((item) => (
              <SpotCard
                key={item?._id}
                image={item?.country_flag}
                link={`/spots-by-country/${item?.country_name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
