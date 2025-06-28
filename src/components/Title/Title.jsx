import "./style.css";
import PropTypes from "prop-types";

const Title = ({ children, className }) => {
  return (
    <div>
      <h1 className={className}>{children}</h1>
    </div>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Title;
