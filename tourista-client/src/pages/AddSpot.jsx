import AddSpotForm from "@/components/custom-components/AddSpotForm";
import TitlePage from "@/components/custom-components/TitlePage";

const AddSpot = () => {
  return (
    <section className="py-10">
      <div className="container">
        <TitlePage title="Add Tourists Spot" />
        <div className="flex justify-center">
          <AddSpotForm />
        </div>
      </div>
    </section>
  );
};

export default AddSpot;
