import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

export default class NewChecklistItem extends Component {
  displayName = NewChecklistItem.name;

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      handleListItemSubmit: props.handleListItemSubmit
    };
  }
  handleListItemKeyPress = event => {
    var keypressed = event.keyCode || event.which;
    if (keypressed === 13) {
      this.state.handleListItemSubmit(this.state.text);
      this.setState({
        text: ""
      });
    }
  };

  addItem = () => {
    this.state.handleListItemSubmit(this.state.text);
    this.setState({
      text: ""
    });
  };

  setText = event => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    const { text } = this.state;
    return (
      <li>
        <FontAwesomeIcon icon={faSquare} className="grayed" />{" "}
        <input
          type="text"
          placeholder="Add New Item"
          onKeyDown={this.handleListItemKeyPress}
          onChange={this.setText}
          value={text}
        />
        <button className="buttonsWithIcons" onClick={this.addItem}>
          <FontAwesomeIcon icon={faPlusSquare} size={"2x"} />
        </button>
      </li>
    );
  }
}
