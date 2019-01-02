import React, { Component } from "react";
import ChecklistItem from "./ChecklistItem";
import ChecklistCompletion from "./ChecklistCompletion";
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

  handleListItemAdd = () => {
    this.setState({
      addItem: true
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

  handleListItemCompleteAll = () => {
    this.setState({
      finished: true
    });
  };

  handleListItemCancle = () => {
    this.setState({
      addItem: false
    });
  };

  handleListItemKeyPress = event => {
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
        addItem: false,
        finished: false
      });
    }
  };
  handleListItemSubmit = () => {
    var items = this.state.items;
    items.push({
      key: items.length,
      text: document.getElementById("newCheckListItem").value,
      checked: false
    });
    document.getElementById("newCheckListItem").value = "";

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
        <ul className="undressed">
          {items.map(i => (
            <ChecklistItem
              text={i.text}
              checked={i.checked}
              id={i.key}
              key={i.key}
              onCheck={this.handleListItemCheck}
              deleteItem={this.handleListItemDelete}
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
          {addItem ? (
            <div>
              <button
                className="buttonsWithIcons"
                onClick={this.handleListItemCancle}
              >
                <i className="fa fa-ban clickableIcons" aria-hidden="true" />
              </button>
              <button
                className="buttonsWithIcons"
                onClick={this.handleListItemSubmit}
              >
                <i
                  className="fa fa-plus-circle clickableIcons"
                  aria-hidden="true"
                />
              </button>
            </div>
          ) : (
            <div>
              <button
                className="buttonsWithIcons"
                onClick={this.handleListItemAdd}
              >
                <i
                  className="fa fa-plus-circle clickableIcons"
                  aria-hidden="true"
                />
              </button>
              <br />
              {items.length > 0 ? (
                <button
                  className="careful"
                  onClick={this.handleListItemCompleteAll}
                >
                  Complete
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}
