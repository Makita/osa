import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function NavLink(props) {
  const hrefFormatted = "#" + props.text.toLowerCase().replace(' ', '_');
  if(props.page === props.text) {
    return (
      <NavItem eventKey={props.text} href={hrefFormatted}>
        {props.text}
      </NavItem>
    );
  } else {
    return (
      <NavItem eventKey={props.text} href={hrefFormatted} onClick={props.handleClick}>
        {props.text}
      </NavItem>
    );
  }
}

function NavLinks(props) {
  const texts = ["Info", "Services"];
  return texts.map((text) =>
    <NavLink key={text} text={text} handleClick={props.handleClick} page={props.page} />
  );
}

class Navibar extends Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <NavLinks handleClick={this.props.handleClick} app={this.props.app} page={this.props.page} />
          <NavDropdown eventKey="1" title="Appointments" id="appointments-dropdown">
            <MenuItem eventKey="1.1" href="#appointment" onClick={this.props.handleClick}>Make an Appointment</MenuItem>
            <MenuItem eventKey="1.2" href="#schedule" onClick={this.props.handleClick}>Current Bookings</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Navibar;
