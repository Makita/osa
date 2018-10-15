import React, { Component } from 'react';

import tempLogo from './mechanic.svg';

class Header extends Component {
  render() {
    return (
      <div id="header_border">
        <div id="header">
          <img id="logo" src={tempLogo} alt="Logo" />
          <div id="company_name">One Stop Auto & Hitch Inc.</div>
          <div id="contact_info"><address>9508 62 Ave. NW</address> &nbsp; TEL: <a href="tel:7809880888">(780)-988-0888</a></div>
          <div id="photos">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
