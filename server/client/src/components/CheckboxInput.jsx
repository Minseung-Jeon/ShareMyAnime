import React from "react";

function CheckboxInput({ labelName, type, name, value, onChange }) {
  return (
    <div>
      <label>
        {labelName}:
        <input type={type} name={name} value={value} onChange={onChange} />
      </label>
    </div>
  );
}

export default CheckboxInput;
