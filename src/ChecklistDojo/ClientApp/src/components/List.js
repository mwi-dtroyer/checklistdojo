import React, { Component } from "react";

export class List extends Component {
  displayName = List.name;

  constructor(props) {
    super(props);

    this.state = { listItems: [], loading: true };

    var fakeQueryData = [
      { key: 1, lable: "step one: steal underpants", checked: true },
      { key: 2, lable: "step two: ", checked: false },
      { key: 3, lable: "step three: profit", checked: true },
      { key: 4, lable: "whats step 2?", checked: false }
    ];
    fetch("api/SampleData/WeatherForecasts")
      .then(response => response.json())
      .then(data => {
        this.setState({ listItems: fakeQueryData });
      });
  }

  static MakeCheckList(listItems) {
    return (
      <ul>
        {listItems.map(item =>
          item.checked ? (
            <li>
              <input key={item.key} type="checkbox" checked /> {item.lable}{" "}
            </li>
          ) : (
            <li>
              <input key={item.key} type="checkbox" /> {item.lable}{" "}
            </li>
          )
        )}
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
