import EditSpotForm from "@/components/custom-components/EditSpotForm";
import TitlePage from "@/components/custom-components/TitlePage";

const EditSpot = () => {
  return (
    <section className="py-10">
      <div className="container">
        <TitlePage title="Edit Tourists Spot" />
        <div className="flex justify-center">
          <EditSpotForm />
        </div>
      </div>
    </section>
  );
};

export default EditSpot;
