import React, { Component } from "react";

export default class NewChecklistItem extends Component {
  displayName = NewChecklistItem.name;

  constructor(props) {
    super(props);

    this.state = {
      newItemText: "",
      handleListItemSubmit: props.handleListItemSubmit
    };
  }
  handleListItemKeyPress = event => {
    var keypressed = event.keyCode || event.which;
    if (keypressed === 13) {
      this.state.handleListItemSubmit(event.target.value);

      this.setState({
        newItemText: ""
      });
    }
  };

  render() {
    const { newItemText } = this.state;
    return (
      <div>
        <li>
          <input className="fancyCheck" type="checkbox" disabled={true} />{" "}
          <input
            type="text"
            placeholder="Press Enter When Done"
            onKeyDown={this.handleListItemKeyPress}
            onChange={() => {
              this.setState({
                newItemText: this.value
              });
            }}
            value={newItemText}
          />
        </li>
      </div>
    );
  }
}
