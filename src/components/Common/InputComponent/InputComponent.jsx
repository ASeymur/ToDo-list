import "./style.css";
import PropTypes from "prop-types";

const InputComponent = ({
  type,
  placeholder,
  value,
  onChange,
  handleKeyDown,
  className,
  checked,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      className={className}
      checked={checked}
    />
  );
};

InputComponent.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  className: PropTypes.string,
  checked: PropTypes.bool,
};

export default InputComponent;
