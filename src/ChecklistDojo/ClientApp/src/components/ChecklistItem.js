import React from "react";

export default ({
  type = "checkbox",
  name,
  checked,
  onCheck,
  text,
  toggleModal
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
    <button className="removeItem" name={name} onClick={toggleModal}>
      delete
    </button>
  </li>
);
