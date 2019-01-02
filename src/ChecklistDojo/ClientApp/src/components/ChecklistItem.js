import React from "react";

export default ({
  type = "checkbox",
  name,
  checked,
  onCheck,
  text,
  deleteItem
}) => (
  <li>
    <input
      className="fancyCheck"
      type={type}
      name={name}
      checked={checked}
      onChange={onCheck}
    />{" "}
    {text} {"   "}
    <button className="removeItem" name={name} onClick={deleteItem}>
      <i class="fa fa-trash-o" aria-hidden="true" />
    </button>
  </li>
);
