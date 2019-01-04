import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";

export default ({ id, checked, onCheck, text, deleteItem, finished }) => (
  <li>
    <FontAwesomeIcon
      icon={checked ? faCheckSquare : faSquare}
      id={id}
      onClick={onCheck}
      className={`${finished ? " grayed" : ""} aria-hidden="true"`}
    />{" "}
    {text} {"   "}
    <button
      className={`buttonsWithIcons ${finished ? " grayed" : ""}`}
      name={id}
      onClick={deleteItem}
    >
      <FontAwesomeIcon
        icon={faTrashAlt}
        className={`${finished ? " grayed" : ""} aria-hidden="true"`}
      />
    </button>
  </li>
);
