import RegisterForm from "@/components/custom-components/RegisterForm";
import TitlePage from "@/components/custom-components/TitlePage";
import { Link } from "react-router-dom";
import AuthImage from "../assets/auth-image.png";

const RegisterPage = () => {
  return (
    <div className="container py-5">
      <TitlePage title="Register" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center min-h-[90vh]">
        <div className="w-full">
          <img src={AuthImage} alt="Image" />
        </div>
        <div className="w-full">
          <h1 className="mb-8 text-center font-bold text-2xl text-[#484848]">
            Register Here
          </h1>
          <RegisterForm />
          <p className="font-semibold text-lg mt-5 text-center">
            Have You Account? Please Do{" "}
            <Link to="/login" className="text-primaryColor underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
