import Loading from "@/components/custom-components/Loading";
import SpotCard from "@/components/custom-components/SpotCard";
import TitlePage from "@/components/custom-components/TitlePage";
import useAuth from "@/hooks/useAuth";
import { useSpotsDataByEmail } from "@/hooks/useFetchSpotsData";
import { Link } from "react-router-dom";

const MyListed = () => {
  const { user } = useAuth();
  const {
    data: touristSpots,
    isLoading,
    error,
  } = useSpotsDataByEmail(user?.email);

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
      <TitlePage title="My Listed" />
      <div className="container">
        <h1 className="text-center font-bold text-3xl mb-6">My Listed Spots</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {touristSpots.map((item) => (
            <SpotCard
              key={item?._id}
              image={item?.spot_image_url}
              title={item?.spot_name}
              link={`/spots/${item?._id}`}
            >
              <button className="primary-button">Delete</button>
              <Link to={`/edit/${item?._id}`} className="secondary-button">
                Edit
              </Link>
            </SpotCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyListed;
