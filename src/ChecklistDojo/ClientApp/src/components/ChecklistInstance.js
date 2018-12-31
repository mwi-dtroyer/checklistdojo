import React, { Component } from "react";
import ChecklistItem from "./ChecklistItem";
import "./NavMenu.css";

export default class ChecklistInstance extends Component {
  displayName = ChecklistInstance.name;

  constructor(props) {
    super(props);

    // This should work as our general core format for a checklist, though it is missing
    // the metadata we'll need for database idos, user idos, etc
    this.state = {
      addItem: false,
      title: "Get Rich Quick Scheme",
      description: "A fast and easy three step path to financial success",
      items: [
        { key: 0, text: "step one: steal underpants", checked: true },
        { key: 1, text: "step two: ", checked: false },
        { key: 2, text: "step three: profit", checked: true },
        { key: 3, text: "whats step 2?", checked: false }
      ]
    };
  }

  handleListItemCheck = event => {
    var items = this.state.items;
    items[event.target.name].checked = event.target.checked;
    this.setState({
      items: items
    });
  };

  handleListItemAdd = () => {
    this.setState({
      addItem: true
    });
  };

  handleListItemDelete = event => {
    console.log("Delete");
    console.log(event);
    var items = this.state.items;
    items = items.filter(function(value) {
      return value.key != event.target.name;
    });
    this.setState({
      items: items
    });
  };

  handleListItemCompleteAll = () => {
    var items = this.state.items;
    items.map(i => (i.checked = true));
    this.setState({
      items: items
    });
  };

  handleListItemCancle = () => {
    this.setState({
      addItem: false
    });
  };

  handleListItemSubmit = event => {
    var keypressed = event.keyCode || event.which;
    if (keypressed === 13) {
      var items = this.state.items;
      items.push({
        key: items.length,
        text: event.target.value,
        checked: false
      });
      event.target.value = "";

      this.setState({
        items: items,
        addItem: false
      });
    }
  };
  render() {
    const { title, description, items, addItem } = this.state;
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
            <ChecklistItem
              text={i.text}
              checked={i.checked}
              name={i.key}
              key={i.key}
              onCheck={this.handleListItemCheck}
              onDelete={this.handleListItemDelete}
            />
          ))}
          {addItem ? (
            <li>
              <input type="checkbox" disabled="true" />{" "}
              <input
                type="text"
                placeholder="Press Enter When Done"
                onKeyDown={this.handleListItemSubmit}
              />
            </li>
          ) : null}
        </ul>

        <div id="header-content">
          {addItem ? (
            <button onClick={this.handleListItemCancle}>Cancle</button>
          ) : (
            <div>
              <button onClick={this.handleListItemAdd}>+ Add</button>
              <br />
              <button onClick={this.handleListItemCompleteAll}>
                Complete All
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
