import React, { Component } from 'react';
import './App.scss';

import Header from './header/header';
import Navibar from './navbar/navbar';
import Content from './content/content';
import Footer from './footer/footer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Navibar />
        <Content />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
