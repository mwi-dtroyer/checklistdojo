import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

export default class NewChecklistItem extends Component {
  displayName = NewChecklistItem.name;

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      handleListItemSubmit: props.handleListItemSubmit,
      handleListItemCancel: props.handleListItemCancel
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
    console.log(this.state.text);
    this.state.handleListItemSubmit(this.state.text);
  };

  setText = event => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    const { text, finished, handleListItemCancel } = this.state;
    return (
      <div>
        <li>
          <FontAwesomeIcon icon={faSquare} className="grayed" />{" "}
          <input
            type="text"
            placeholder="Press Enter When Done"
            onKeyDown={this.handleListItemKeyPress}
            onChange={this.setText}
            value={text}
          />
          <button
            className={`buttonsWithIcons ${finished ? "grayed" : ""}`}
            onClick={this.addItem}
          >
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={finished ? "grayed" : ""}
              size={"1x"}
            />
          </button>
          <button
            className={`buttonsWithIcons ${finished ? "grayed" : ""}`}
            onClick={handleListItemCancel}
          >
            <FontAwesomeIcon
              icon={faBan}
              className={finished ? "grayed" : ""}
              size={"1x"}
            />
          </button>
        </li>
      </div>
    );
  }
}
