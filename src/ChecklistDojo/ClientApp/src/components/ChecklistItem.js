import React from "react";

export default ({ id, checked, onCheck, text, deleteItem, finished }) => (
  <li>
    <i
      className={
        "fa fa" +
        (checked ? "-check" : "") +
        "-square-o clickableIcons" +
        (finished ? " grayed" : "")
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
      <i
        className={"fa fa-trash-o clickableIcons" + (finished ? " grayed" : "")}
        aria-hidden="true"
      />
    </button>
  </li>
);
