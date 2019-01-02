import React from "react";

export default ({ id, checked, onCheck, text, deleteItem }) => (
  <li>
    <i
      className={
        checked
          ? "fa fa-check-square-o clickableIcons"
          : "fa fa-square-o clickableIcons"
      }
      id={id}
      onClick={onCheck}
    />{" "}
    {text} {"   "}
    <button className="buttonsWithIcons" name={id} onClick={deleteItem}>
      <i className="fa fa-trash-o clickableIcons" aria-hidden="true" />
    </button>
  </li>
);
