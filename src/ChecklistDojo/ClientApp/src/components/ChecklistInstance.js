import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ChecklistItem from "./ChecklistItem";
import ChecklistCompletion from "./ChecklistCompletion";
import CompleteAllButton from "./CompleteAllButton";
import "./ChecklistInstance.css";
import NewCheckListItem from "./NewChecklistItem";

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
    var key = event.target.id;
    var changedItem = this.state.items[key];
    changedItem.checked = !changedItem.checked;
    const items = this.state.items.filter(function(value) {
      if (value.key == key) {
        return changedItem;
      } else {
        return value;
      }
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
              disabled={finished}
            />
          ))}
          {addItem ? (
            <NewCheckListItem
              handleListItemSubmit={this.handleListItemSubmit}
              handleListItemCancel={() => {
                this.setState({
                  addItem: false
                });
              }}
            />
          ) : null}
        </ul>

        <div id="header-content">
          <button
            className={`buttonsWithIcons ${finished ? "grayed" : ""}`}
            onClick={() => {
              this.setState({ addItem: true });
            }}
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              className={finished ? "grayed" : ""}
              size={"2x"}
            />
          </button>
          <br />
          <br />
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
