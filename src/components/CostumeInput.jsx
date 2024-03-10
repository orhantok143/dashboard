import React from "react";
import "./costumInput.css";

const CostumeInput = (props) => {
  const { id, type, name, placeholder, onChange, onBlur } = props;
  return (
    // <div className="input-container">
    <input
      className="modern-input"
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
    // </div>
  );
};

export default CostumeInput;
