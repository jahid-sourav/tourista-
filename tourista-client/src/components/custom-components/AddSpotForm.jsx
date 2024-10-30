import useAuth from "@/hooks/useAuth";
import useCountriesData from "@/hooks/useFetchCountriesData";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loading from "./Loading";

const AddSpotForm = () => {
  const navigate = useNavigate();
  const { data: countries, isLoading, error, refetch } = useCountriesData();
  const { user } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const handleAddSpot = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/spots",
        formData
      );
      if (data.insertedId) {
        reset();
        refetch();
        toast.success("A New Spot Added");
        navigate("/my-list");
      } else {
        toast.error("Failed to add a new spot");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add a new spot");
    }
  };

  if (isLoading) {
    return <Loading size={15} color="red" />;
  }
  if (error) {
    return <p>Fetching Error!</p>;
  }

  return (
    <form className="w-full lg:w-1/2" onSubmit={handleSubmit(handleAddSpot)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            {...register("spot_image_url", {
              required: "Image URL Is Required",
            })}
            type="url"
            name="spot_image_url"
            placeholder="Enter Image URL"
            className={`p-2 rounded border ${
              errors.spot_image_url ? "border-red-600" : "border-gray-300"
            } w-full outline-none`}
          />
          {errors?.spot_image_url && (
            <p className="my-2 text-red-600">
              {errors?.spot_image_url.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("spot_name", {
              required: "Tourists Spot Name Is Required",
            })}
            type="text"
            name="spot_name"
            placeholder="Enter Tourists Spot Name"
            className={`p-2 rounded border ${
              errors.spot_name ? "border-red-600" : "border-gray-300"
            } w-full outline-none`}
          />
          {errors?.spot_name && (
            <p className="my-2 text-red-600">{errors?.spot_name.message}</p>
          )}
        </div>

        <div>
          <select
            defaultValue=""
            {...register("spot_country", {
              required: "Tourist Spot Country Is Required",
            })}
            name="spot_country"
            className={`p-2 rounded border ${
              errors.spot_country ? "border-red-600" : "border-gray-300"
            } bg-green-400 font-semibold text-base outline-none`}
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((item) => (
              <option key={item?._id} defaultValue={item?.country_name}>
                {item?.country_name}
              </option>
            ))}
          </select>
          {errors?.spot_country && (
            <p className="my-2 text-red-600">{errors?.spot_country.message}</p>
          )}
        </div>
        <div>
          <select
            defaultValue=""
            {...register("spot_seasonality", {
              required: "Tourist Spot Seasonality Is Required",
            })}
            name="spot_seasonality"
            className={`p-2 rounded border ${
              errors.spot_seasonality ? "border-red-600" : "border-gray-300"
            } bg-green-400 font-semibold text-base outline-none`}
          >
            <option value="" disabled>
              Select Seasonality
            </option>
            <option value="Summer">Summer</option>
            <option value="Winter">winter</option>
          </select>
          {errors?.spot_seasonality && (
            <p className="my-2 text-red-600">
              {errors?.spot_seasonality.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            {...register("spot_location", {
              required: "Tourist Spot Location Is Required",
            })}
            name="spot_location"
            placeholder="Enter Tourists Spot Location"
            className={`p-2 rounded border ${
              errors.spot_location ? "border-red-600" : "border-gray-300"
            } w-full outline-none`}
          />
          {errors?.spot_location && (
            <p className="my-2 text-red-600">{errors?.spot_location.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            {...register("spot_average_cost", {
              required: "Tourist Spot Average Cost Is Required",
            })}
            name="spot_average_cost"
            placeholder="Enter Average Cost"
            className={`p-2 rounded border ${
              errors.spot_average_cost ? "border-red-600" : "border-gray-300"
            } w-full outline-none`}
          />
          {errors?.spot_average_cost && (
            <p className="my-2 text-red-600">
              {errors?.spot_average_cost.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="number"
            {...register("spot_travel_time", {
              required: "Travel Time Is Required",
            })}
            name="spot_travel_time"
            placeholder="Enter Travel Time (Days)"
            className={`p-2 rounded border ${
              errors.spot_travel_time ? "border-red-600" : "border-gray-300"
            } w-full outline-none`}
          />
          {errors?.spot_travel_time && (
            <p className="my-2 text-red-600">
              {errors?.spot_travel_time.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="number"
            {...register("spot_total_visitors_per_year", {
              required: "Total Visitors Per Year Is Required",
            })}
            name="spot_total_visitors_per_year"
            placeholder="Enter Total Visitors Per Year"
            className={`p-2 rounded border ${
              errors.spot_total_visitors_per_year
                ? "border-red-600"
                : "border-gray-300"
            } w-full outline-none`}
          />
          {errors?.spot_total_visitors_per_year && (
            <p className="my-2 text-red-600">
              {errors?.spot_total_visitors_per_year.message}
            </p>
          )}
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
            {...register("spot_short_description", {
              required: "Spot Short Description Is Required",
            })}
            placeholder="Enter Tourists Spot Short Description"
            className={`p-2 rounded border ${
              errors.spot_short_description
                ? "border-red-600"
                : "border-gray-300"
            } w-full outline-none`}
          ></textarea>
          {errors?.spot_short_description && (
            <p className="my-2 text-red-600">
              {errors?.spot_short_description.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 text-center">
        <button className="primary-button">Add Tourist Spot</button>
      </div>
    </form>
  );
};

export default AddSpotForm;

/*
spot_average_cost
spot_country
spot_image_url
spot_location
spot_name
spot_seasonality
spot_short_description
spot_total_visitors_per_year
spot_travel_time
*/
