import React, { Component } from "react";
import ChecklistItem from "./ChecklistItem";

export default class ChecklistInstance extends Component {
  displayName = ChecklistInstance.name;

  constructor(props) {
    super(props);

    // This should work as our general core format for a checklist, though it is missing
    // the metadata we'll need for database idos, user idos, etc
    this.state = {
      title: "Get Rich Quick Scheme",
      description: "A fast and easy three step path to financial success",
      items: [
        { key: 1, text: "step one: steal underpants", checked: true },
        { key: 2, text: "step two: ", checked: false },
        { key: 3, text: "step three: profit", checked: true },
        { key: 4, text: "whats step 2?", checked: false }
      ]
    };
  }
  render() {
    const { title, description, items } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        {/*
        TODO: Use a combination of css grid and stylesheets for handling our item layout.
        An unordered list looks a bit drab.
        */}
        <ul>
          {items.map(i => (
            <ChecklistItem {...i} />
          ))}
        </ul>
      </div>
    );
  }
}
