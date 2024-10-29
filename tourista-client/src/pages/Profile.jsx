import TitlePage from "@/components/custom-components/TitlePage";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const fullName = e.target.full_name.value;
    const photoURL = e.target.imageURL.value;

    updateUserProfile(user, fullName, photoURL)
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <section className="py-5">
      <TitlePage title={user?.displayName} />
      <div className="flex justify-center">
        <img
          src={user?.photoURL}
          alt="Image"
          className="w-[300px] h-[300px] rounded-full object-cover"
        />
      </div>
      <div className="container flex justify-center">
        <form className="w-1/2" onSubmit={handleUpdateProfile}>
          <label htmlFor="full_name" className="mb-2 text-lg font-semibold">
            Name
          </label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            defaultValue={user?.displayName}
            className="block p-2 rounded border border-gray-400 w-full mb-3"
          />
          <label htmlFor="imageURL" className="mb-2 text-lg font-semibold">
            Photo URL
          </label>
          <input
            id="imageURL"
            type="url"
            name="imageURL"
            defaultValue={user?.photoURL}
            className="block p-2 rounded border border-gray-400 w-full"
          />
          <div className="text-center mt-3">
            <button className="primary-button" type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
