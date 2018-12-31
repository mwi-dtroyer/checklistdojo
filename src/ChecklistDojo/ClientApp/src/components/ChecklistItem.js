import React from "react";

export default ({
  type = "checkbox",
  name,
  checked,
  onCheck,
  text,
  onDelete
}) => (
  <li>
    <input type={type} name={name} checked={checked} onChange={onCheck} />{" "}
    {text} {"   "}
    <button name={name} onClick={onDelete}>
      -
    </button>
  </li>
);
