import React from "react";
import "./costumeSelect.css";

const CostumeSelect = (props) => {
  return (
    <div className="input-container">
      <select id="modern-select">
        <option value=""> Kategory seçiniz </option>
        {props.data.map((item, i) => {
          return (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CostumeSelect;
