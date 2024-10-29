import { Link } from "react-router-dom";
import ErrorImage from "../assets/404.png";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <img src={ErrorImage} alt="Error" />
        <div className="text-center mt-5">
          <Link to="/" className="primary-button">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
