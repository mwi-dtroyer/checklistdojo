import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    if (localStorage.getItem("isLoggedIn", "true")) {
      return (
        <header>
          <Navbar
            className="navbar-expand-md navbar-toggleable-md ng-white border-bottom box-shadow mb-3"
            light
          >
            <Container>
              <NavbarBrand tag={Link} to="/">
                Checklist Dojo
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse
                className="d-md-inline-flex flex-md-row-reverse"
                isOpen={!this.state.collapsed}
                navbar
              >
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">
                      Dashboard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/templates">
                      Templates
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/scheduled">
                      Scheduled
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/history">
                      History
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/settings">
                      Settings
                    </NavLink>
                  </NavItem>
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
      );
    } else {
      return (
        <header>
          <Navbar
            className="navbar-expand-md navbar-toggleable-md ng-white border-bottom box-shadow mb-3"
            light
          >
            <Container>
              <NavbarBrand tag={Link} to="/">
                Checklist Dojo
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse
                className="d-md-inline-flex flex-md-row-reverse"
                isOpen={!this.state.collapsed}
                navbar
              >
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">
                      Dashboard
                    </NavLink>
                  </NavItem>
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
      );
    }
  }
}
