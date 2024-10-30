import useAuth from "@/hooks/useAuth";
import useCountriesData from "@/hooks/useFetchCountriesData";
import { useASpotData } from "@/hooks/useFetchSpotsData";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "./Loading";

const EditSpotForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();
  const { data: spot, isLoading, error, refetch } = useASpotData(id);
  const { data: countries, isLoading: loading } = useCountriesData();

  const handleEditSpot = async (formData) => {
    try {
      const { data } = await axios.put(
        `https://tourista-server-indol.vercel.app/spots/${id}`,
        formData
      );
      if (data.modifiedCount > 0) {
        reset();
        toast.success("Spot Updated!");
        refetch();
        navigate("/my-list");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading || loading) {
    return <Loading size={15} color="red" />;
  }
  if (error) {
    return <p>Fetching Error!</p>;
  }

  return (
    <form className="w-full lg:w-1/2" onSubmit={handleSubmit(handleEditSpot)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            {...register("spot_image_url")}
            type="url"
            name="spot_image_url"
            placeholder="Enter Image URL"
            defaultValue={spot?.spot_image_url}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          />
        </div>
        <div>
          <input
            {...register("spot_name")}
            type="text"
            name="spot_name"
            placeholder="Enter Tourists Spot Name"
            defaultValue={spot?.spot_name}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          />
        </div>

        <div>
          <select
            {...register("spot_country")}
            name="spot_country"
            defaultValue={spot?.spot_country}
            className="p-2 rounded border border-gray-300 bg-green-400 font-semibold text-base outline-none"
          >
            {countries.map((item) => (
              <option key={item?._id} defaultValue={item?.country_name}>
                {item?.country_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            {...register("spot_seasonality")}
            name="spot_seasonality"
            defaultValue={spot?.spot_seasonality}
            className="p-2 rounded border border-gray-300 bg-green-400 font-semibold text-base outline-none"
          >
            <option value="Summer">Summer</option>
            <option value="Winter">winter</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            {...register("spot_location")}
            name="spot_location"
            placeholder="Enter Tourists Spot Location"
            defaultValue={spot?.spot_location}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("spot_average_cost")}
            name="spot_average_cost"
            placeholder="Enter Average Cost"
            defaultValue={spot?.spot_average_cost}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          />
        </div>
        <div>
          <input
            type="number"
            {...register("spot_travel_time")}
            name="spot_travel_time"
            placeholder="Enter Travel Time (Days)"
            defaultValue={spot?.spot_travel_time}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          />
        </div>
        <div>
          <input
            type="number"
            {...register("spot_total_visitors_per_year")}
            name="spot_total_visitors_per_year"
            placeholder="Enter Total Visitors Per Year"
            defaultValue={spot?.spot_total_visitors_per_year}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          />
        </div>

        <div>
          <input
            readOnly
            type="email"
            name="spot_creator_email"
            {...register("spot_creator_email")}
            value={user?.email}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          />
        </div>
        <div>
          <textarea
            name="spot_short_description"
            {...register("spot_short_description")}
            placeholder="Enter Tourists Spot Short Description"
            defaultValue={spot?.spot_short_description}
            className="p-2 rounded border border-gray-300 w-full outline-none"
          ></textarea>
        </div>
      </div>

      <div className="mt-5 text-center">
        <button className="primary-button">Update Tourist Spot</button>
      </div>
    </form>
  );
};

export default EditSpotForm;
