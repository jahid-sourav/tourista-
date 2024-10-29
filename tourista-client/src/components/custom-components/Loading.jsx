import PropTypes from "prop-types";
import MoonLoader from "react-spinners/MoonLoader";

const Loading = ({ size, color }) => {
  return (
    <div className="min-h-[1px] flex items-center justify-center">
      <MoonLoader color={color} size={size} />
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Loading;
