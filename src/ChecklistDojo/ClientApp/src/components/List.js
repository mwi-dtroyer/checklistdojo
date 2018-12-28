import React, { Component } from "react";
import { listItems } from "./ListItem";

export class List extends Component {
  displayName = List.name;

  constructor(props) {
    super(props);

    this.state = { listItems: [], loading: true };

    var fakeQueryData = [
      { key: 1, caption: "step one: steal underpants", checked: true },
      { key: 2, caption: "step two: ", checked: false },
      { key: 3, caption: "step three: profit", checked: true },
      { key: 4, caption: "whats step 2?", checked: false }
    ];

    this.setState({ listItems: fakeQueryData });
  }

  static MakeCheckList(listItems) {
    return (
      <ul>
        {listItems.map(item => (
          <ListItems checked={item.checked} caption={item.caption} />
        ))}
      </ul>
    );
  }

  render() {
    var contents = List.MakeCheckList(this.state.listItems);
    console.log(this.props);
    var title = "default";

    if (this.props) {
      console.log(this.props.match.params.title);
      title = this.props.match.params.title;
    }

    return (
      <div>
        <h1>{title}</h1>
        <p>This is a static description.</p>
        {contents}
      </div>
    );
  }
}
