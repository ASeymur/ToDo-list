import PropTypes from "prop-types";

const ButtonComponent = ({ label, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

ButtonComponent.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ButtonComponent;
