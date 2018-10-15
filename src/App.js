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

    this.handleClick = this.handleClick.bind(this);
  }

  formatPageName(name) {
    return name.replace('#', '').toLowerCase();
  }

  handleClick(e) {
    let src = e.target || e.srcElement;
    let href = src.href.split('#')[1];
    this.setState({
      page: this.formatPageName(href),
    });
    console.log(this.formatPageName(href));
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Navibar page={this.state.page} handleClick={this.handleClick} />
        <Content page={this.state.page} handleClick={this.handleClick} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
