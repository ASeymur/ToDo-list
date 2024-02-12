import "./style.css";

const InputComponent = ({type, placeholder, value, onChange, handleKeyDown,className, checked }) => {
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

export default InputComponent;
