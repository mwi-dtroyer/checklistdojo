import React from "react";

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
        className={"buttonsWithIcons" + (finished ? " grayed" : "")}
        onClick={handleListItemCancel}
      >
        <i
          className={"fa fa-ban clickableIcons" + (finished ? " grayed" : "")}
          aria-hidden="true"
        />
      </button>
    ) : null}
    <button
      className={"buttonsWithIcons" + (finished ? " grayed" : "")}
      onClick={addItem ? handleListItemSubmit : handleListItemAdd}
    >
      <i
        className={
          "fa fa-plus-circle clickableIcons" + (finished ? " grayed" : "")
        }
        aria-hidden="true"
      />
    </button>
  </div>
);
