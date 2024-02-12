// import React from "react";

const ButtonComponent = ({ label, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default ButtonComponent;
