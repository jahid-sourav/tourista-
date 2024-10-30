import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SpotCard = ({ children, image, title, link }) => {
  return (
    <div className="p-2 rounded border border-gray-400">
      <img
        src={image}
        alt="Image"
        className="rounded h-[200px] w-full object-cover"
      />
      <h2 className="text-center my-3 font-bold text-lg">{title}</h2>
      <div className="flex justify-center items-center flex-wrap gap-2">
        <Link className="secondary-button" to={link}>
          View Details
        </Link>
        {children}
      </div>
    </div>
  );
};

SpotCard.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
};

export default SpotCard;
