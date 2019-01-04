import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default ({
  finished,
  addItem,
  handleListItemCancel,
  handleListItemSubmit,
  handleListItemAdd
}) => (
  <div>
    {addItem ? (
      <button
        className={`buttonsWithIcons ${finished ? "grayed" : ""}`}
        onClick={handleListItemCancel}
      >
        <FontAwesomeIcon
          icon={faBan}
          className={finished ? "grayed" : ""}
          size={"2x"}
        />
      </button>
    ) : null}
    <button
      className={`buttonsWithIcons ${finished ? "grayed" : ""}`}
      onClick={addItem ? handleListItemSubmit : handleListItemAdd}
    >
      <FontAwesomeIcon
        icon={faPlusCircle}
        className={finished ? "grayed" : ""}
        size={"2x"}
      />
    </button>
  </div>
);
