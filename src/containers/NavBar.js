import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import * as Actions from '../actions';
import { connect } from 'react-redux';
var Firebase = require('firebase');


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { username: ''};
  }

  handleSignout() {
    this.props.signOut();
  }

  render() {
    const user = Firebase.auth().currentUser;
    return (
      <div>
      <Navbar inverse collapseOnSelect className="app-navBar">
        <Navbar.Header>
          <Navbar.Brand >
            <a id="navBrand" href="/Home">Gif Browser</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <li>
              <NavLink to="/Home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/MyGifs">
                MyGifs
              </NavLink>
            </li>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/MyGifs">{user.email}</NavItem>
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} onClick={() => this.handleSignout()}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {this.props.children}
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, Actions)(NavBar);
