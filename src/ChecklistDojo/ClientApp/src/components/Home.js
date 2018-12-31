import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <NavItem>
              <NavLink
                tag={Link}
                className="text-medium"
                to="/Checklist/some-significant-guid"
              >
                Example Template
              </NavLink>
            </NavItem>
          </li>
        </ul>
      </div>
    );
  }
}
