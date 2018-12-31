import React from "react";

export default ({ type = "checkbox", name, checked, onChange, text }) => (
  <li>
    <input type={type} name={name} checked={checked} onChange={onChange} />{" "}
    {text}
  </li>
);
