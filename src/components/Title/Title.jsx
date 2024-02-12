// import React from "react";
import "./style.css";

const Title = ({ children, className }) => {
  return (
    <div>
      <h1 className={className}>{children}</h1>
    </div>
  );
};

export default Title;
