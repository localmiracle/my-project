import React from "react";
import "./CustomRadio.css";

export const CustomRadio = ({ label, name, checked, onChange }) => {
  return (
    <label className="custom-radio">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="radio-custom"></span>
      {label}
    </label>
  );
};
