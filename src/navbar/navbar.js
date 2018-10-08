import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

function NavLink(props) {
  var hrefFormatted = "#" + props.text.toLowerCase().replace(' ', '_');
  if(props.page === props.text) {
    return (
      <NavItem eventKey={props.text} href={hrefFormatted}>
        {props.text}
      </NavItem>
    );
  } else {
    return (
      <NavItem eventKey={props.text} href={hrefFormatted} onClick={props.handleClick.bind(props.app)}>
        {props.text}
      </NavItem>
    );
  }
}

function NavLinks(props) {
  let texts = ["Info", "Services"];
  return texts.map((text) =>
    <NavLink key={text} text={text} handleClick={props.handleClick} app={props.app} page={props.page} />
  );
}

class Navibar extends Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <NavLinks handleClick={this.props.handleClick} app={this.props.app} page={this.props.page} />
          <NavDropdown eventKey="1" title="Appointments">
            <MenuItem eventKey="1.1" href="#appointment" onClick={this.props.handleClick.bind(this.props.app)}>Make an Appointment</MenuItem>
            <MenuItem eventKey="1.2" href="#schedule">Current Bookings</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Navibar;
