import React, { Component } from "react";
import ChecklistItem from "./ChecklistItem";
import ChecklistCompletion from "./ChecklistCompletion";
import CompleteAllButton from "./CompleteAllButton";
import AddConfirmCancel from "./AddConfirmCancel";
import "./ChecklistInstance.css";
import "./FontAwesome.css";

export default class ChecklistInstance extends Component {
  displayName = ChecklistInstance.name;

  constructor(props) {
    super(props);

    // This should work as our general core format for a checklist, though it is missing
    // the metadata we'll need for database idos, user idos, etc
    this.state = {
      finished: false,
      addItem: false,
      newItemText: "",
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

  handleListItemKeyPress = event => {
    var keypressed = event.keyCode || event.which;
    if (keypressed === 13) {
      const items = [
        ...this.state.items,
        {
          key: this.state.items.length,
          text: event.target.value,
          checked: false
        }
      ];
      event.target.value = "";

      this.setState({
        items: items,
        addItem: false,
        finished: false
      });
    } else {
      this.setState({
        newItemText: event.target.value
      });
    }
  };

  handleListItemSubmit = () => {
    const items = [
      ...this.state.items,
      {
        key: this.state.items.length,
        text: this.state.newItemText,
        checked: false
      }
    ];

    this.setState({
      items: items,
      addItem: false,
      finished: false,
      newItemText: ""
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
            <li>
              <input className="fancyCheck" type="checkbox" disabled={true} />{" "}
              <input
                id="newCheckListItem"
                type="text"
                placeholder="Press Enter When Done"
                onKeyDown={this.handleListItemKeyPress}
              />
            </li>
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
