import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

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
  let texts = ["Info", "Appointment", "Contact", "Lorem", "Ipsum", "Dolor"];
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
        </Nav>
      </Navbar>
    );
  }
}

export default Navibar;
