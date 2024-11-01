import LoginForm from "@/components/custom-components/LoginForm";
import TitlePage from "@/components/custom-components/TitlePage";
import useAuth from "@/hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthImage from "../assets/auth-image.png";

const LoginPage = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success(`Welcome ${result.user?.displayName}`);
        navigate(location?.state ? location.state : "/me");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="container py-5">
      <TitlePage title="Login" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center min-h-[90vh]">
        <div className="w-full">
          <img src={AuthImage} alt="Image" />
        </div>
        <div className="w-full">
          <h1 className="mb-8 text-center font-bold text-2xl text-[#484848]">
            Login Here
          </h1>
          <LoginForm />
          <p className="font-semibold text-lg mt-5 text-center">
            Don&apos;t Have An Account? Please Do{" "}
            <Link to="/register" className="text-primaryColor underline">
              Register
            </Link>{" "}
            Or{" "}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="secondary-button"
            >
              Login With Google
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
