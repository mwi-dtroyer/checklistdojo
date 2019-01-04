import React from "react";

export default ({
  finished,
  handleListItemCompleteAll,
  handleListItemReOpen
}) => (
  <span>
    {finished ? (
      <button className="careful" onClick={handleListItemReOpen}>
        Re-Open
      </button>
    ) : (
      <button className="careful" onClick={handleListItemCompleteAll}>
        Complete
      </button>
    )}
  </span>
);
