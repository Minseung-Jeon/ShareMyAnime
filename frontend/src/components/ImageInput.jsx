import React from "react";

function ImageInput({ labelName, type, name, accept, onChange }) {
  return (
    <div>
      <label>
        {labelName}:
        <input type={type} name={name} accept={accept} onChange={onChange} />
      </label>
    </div>
  );
}

export default ImageInput;
