import React from "react";

export default ({ id, checked, onCheck, text, deleteItem, finished }) => (
  <li>
    <i
      className={
        checked
          ? "fa fa-check-square-o clickableIcons"
          : "fa fa-square-o clickableIcons"
      }
      id={id}
      onClick={finished ? null : onCheck}
    />{" "}
    {text} {"   "}
    <button
      className="buttonsWithIcons"
      name={id}
      onClick={finished ? null : deleteItem}
    >
      <i className="fa fa-trash-o clickableIcons" aria-hidden="true" />
    </button>
  </li>
);
