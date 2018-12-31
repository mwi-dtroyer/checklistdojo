import React from "react";

export default props => {
  const { checked, text } = props;
  return (
    <li>
      <input type="checkbox" checked={checked} /> {text}
    </li>
  );
};
