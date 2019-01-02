import React, { Component } from "react";
import { NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const signedIn = isAuthenticated();

    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <NavLink
              tag={Link}
              className="text-medium"
              to="/Checklist/some-significant-guid"
            >
              Sample Checklist
            </NavLink>
          </li>
        </ul>

        {signedIn ? (
          <Button className="btn-margin" onClick={this.logout.bind(this)}>
            Log Out
          </Button>
        ) : (
          <Button className="btn-margin" onClick={this.login.bind(this)}>
            Log In
          </Button>
        )}
      </div>
    );
  }
}
