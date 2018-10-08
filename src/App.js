import React, { Component } from 'react';
import './App.scss';

import Header from './header/header';
import Navibar from './navbar/navbar';
import Content from './content/content';
import Footer from './footer/footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.formatPageName(window.location.hash) || "info",
    }
    this.handleClick.bind(this);
  }

  formatPageName(name) {
    return name.toLowerCase().replace('#', '');
  }

  handleClick(e) {
    let src = e.target || e.srcElement;
    this.setState({
      page: this.formatPageName(src.innerHTML),
    });
    console.log(this.formatPageName(src.innerHTML));
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Navibar page={this.state.page} handleClick={this.handleClick} app={this} />
        <Content page={this.state.page} handleClick={this.handleClick} app={this} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
