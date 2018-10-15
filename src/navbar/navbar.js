import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LinkWrapper(props) {
  return (
    <li role="presentation" href={props.to}>
      <Link to={props.to}>{props.children}</Link>
    </li>
  );
}

class Navibar extends Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <LinkWrapper to="/">Info</LinkWrapper>
          <LinkWrapper to="/services">Services</LinkWrapper>
          <LinkWrapper to="/appointment">Make an Appointment</LinkWrapper>
          <LinkWrapper to="/schedule">Current Bookings</LinkWrapper>
        </Nav>
      </Navbar>
    );
  }
}

export default Navibar;
