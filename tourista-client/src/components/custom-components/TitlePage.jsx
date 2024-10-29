import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const TitlePage = ({ title }) => {
  return (
    <Helmet>
      <title>{title} • Tourista</title>
    </Helmet>
  );
};

TitlePage.propTypes = {
  title: PropTypes.string,
};

export default TitlePage;
