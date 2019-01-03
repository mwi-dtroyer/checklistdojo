import React, { Component } from "react";
import ChecklistItem from "./ChecklistItem";
import ChecklistCompletion from "./ChecklistCompletion";
import CompleteAllButton from "./CompleteAllButton";
import AddConfirmCancel from "./AddConfirmCancel";
import "./ChecklistInstance.css";
import "./FontAwesome.css";
import NewCheckListItem from "./NewListItemTextbox";

export default class ChecklistInstance extends Component {
  displayName = ChecklistInstance.name;

  constructor(props) {
    super(props);

    // This should work as our general core format for a checklist, though it is missing
    // the metadata we'll need for database idos, user idos, etc
    this.state = {
      finished: false,
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
    var items = this.state.items.filter(function(value) {
      if (value.key == event.target.id) {
        value.checked = !value.checked;
      }
      return value;
    });
    var unfinished = items.filter(function(value) {
      return value.checked == false;
    }).length;
    this.setState({
      items: items,
      finished: unfinished == 0
    });
  };

  handleListItemDelete = event => {
    var key =
      event.target.name == null
        ? event.target.parentNode.name
        : event.target.name;
    var items = this.state.items.filter(function(value) {
      return value.key != key;
    });
    var unfinished = items.filter(function(value) {
      return value.checked == false;
    }).length;
    this.setState({
      items: items,
      finished: unfinished == 0
    });
  };

  handleListItemSubmit = value => {
    const items = [
      ...this.state.items,
      {
        key: this.state.items.length,
        text: value,
        checked: false
      }
    ];

    this.setState({
      items: items,
      addItem: false,
      finished: false
    });
  };

  render() {
    const { title, description, items, addItem, finished } = this.state;
    return (
      <div>
        <h1>
          {title} <ChecklistCompletion finished={finished} />
        </h1>

        <p>{description}</p>
        <ul className="removeBullets">
          {items.map(i => (
            <ChecklistItem
              text={i.text}
              checked={i.checked}
              id={i.key}
              key={i.key}
              onCheck={this.handleListItemCheck}
              deleteItem={this.handleListItemDelete}
              finished={finished}
            />
          ))}
          {addItem ? (
            <NewCheckListItem
              handleListItemSubmit={this.handleListItemSubmit}
            />
          ) : null}
        </ul>

        <div id="header-content">
          <AddConfirmCancel
            finished={finished}
            addItem={addItem}
            handleListItemCancel={() => {
              this.setState({
                addItem: false
              });
            }}
            handleListItemSubmit={this.handleListItemSubmit}
            handleListItemAdd={() => {
              this.setState({
                addItem: true
              });
            }}
          />

          <CompleteAllButton
            finished={finished}
            handleListItemCompleteAll={() => {
              this.setState({
                finished: true,
                addItem: false
              });
            }}
            handleListItemReOpen={() => {
              this.setState({
                finished: false
              });
            }}
          />
        </div>
      </div>
    );
  }
}
