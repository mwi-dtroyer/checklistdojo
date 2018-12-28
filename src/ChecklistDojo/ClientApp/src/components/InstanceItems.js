import React, { Component } from "react";

export class InstanceItems extends React.Component {
  state = {
    items: []
  };
  render() {
    const { items, thing } = this.props;

    return (
      <ul>
        {items.map(i => (
          <li>
            <input id={i.key} type="checkbox" checked={i.checked} /> {i.caption}
          </li>
        ))}
      </ul>
    );
  }
}
