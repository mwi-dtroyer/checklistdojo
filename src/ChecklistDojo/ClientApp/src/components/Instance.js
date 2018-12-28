import React, { Component } from "react";
import { InstanceItems } from "./InstanceItems";

export class Instance extends Component {
  displayName = Instance.name;

  constructor(props) {
    super(props);

    this.state = {
      listItems: [
        { key: 1, caption: "step one: steal underpants", checked: true },
        { key: 2, caption: "step two: ", checked: false },
        { key: 3, caption: "step three: profit", checked: true },
        { key: 4, caption: "whats step 2?", checked: false }
      ],
      loading: true
    };
  }
  componentDidMount() {
    var fakeQueryData = [
      { key: 1, caption: "step one: steal underpants", checked: true },
      { key: 2, caption: "step two: ", checked: false },
      { key: 3, caption: "step three: profit", checked: true },
      { key: 4, caption: "whats step 2?", checked: false }
    ];

    this.setState({ listItems: fakeQueryData });
  }

  render() {
    var title = "default";

    if (this.props) {
      title = this.props.match.params.title;
    }
    console.log(this.state);

    return (
      <div>
        <h1>{title}</h1>
        <p>This is a static description.</p>
        <InstanceItems items={this.state.listItems} />
      </div>
    );
  }
}
