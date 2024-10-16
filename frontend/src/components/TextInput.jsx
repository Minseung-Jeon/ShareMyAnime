import React from "react";

function TextInput({
  placeholder,
  type,
  name,
  value,
  onChange,
  isRequired = false,
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
    </div>
  );
}

export default TextInput;
