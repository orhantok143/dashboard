import React from "react";
import "./costumeBtn.css";

const CostumeBtn = (props) => {
  return (
    <button type={props.type} id="modern-button">
      Gönder
    </button>
  );
};

export default CostumeBtn;
