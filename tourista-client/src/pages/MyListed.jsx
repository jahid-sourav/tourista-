import Loading from "@/components/custom-components/Loading";
import SpotCard from "@/components/custom-components/SpotCard";
import TitlePage from "@/components/custom-components/TitlePage";
import useAuth from "@/hooks/useAuth";
import { useSpotsDataByEmail } from "@/hooks/useFetchSpotsData";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyListed = () => {
  const { user } = useAuth();
  const {
    data: touristSpots,
    isLoading,
    error,
    refetch,
  } = useSpotsDataByEmail(user?.email);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const { data } = await axios.delete(
        `https://tourista-server-indol.vercel.app/spots/${id}`
      );
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
        refetch();
      }
    }
  };

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
        {touristSpots.length === 0 ? (
          <div className="text-center">
            <p className="text-center font-bold text-2xl mb-5">
              You Don&apos;t have Add Any Spots Yet.
            </p>
            <Link to="/add-spot" className="secondary-button">
              Add A Spot
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {touristSpots.map((item) => (
              <SpotCard
                key={item?._id}
                image={item?.spot_image_url}
                title={item?.spot_name}
                link={`/spots/${item?._id}`}
              >
                <button
                  className="primary-button"
                  onClick={() => handleDelete(item?._id)}
                >
                  Delete
                </button>
                <Link to={`/edit/${item?._id}`} className="secondary-button">
                  Edit
                </Link>
              </SpotCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyListed;
