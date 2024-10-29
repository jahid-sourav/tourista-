import PropTypes from "prop-types";

const Field = ({ htmlFor, label, children }) => {
  return (
    <div className="mb-3 w-full">
      <label htmlFor={htmlFor} className="font-semibold text-lg text-[#484848]">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
};
Field.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};
export default Field;
