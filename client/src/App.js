import React, { Component } from 'react';
import './App.scss';

import Header from './components/header/header';
import Navibar from './components/navbar/navbar';
import Content from './components/content/content';
import Footer from './components/footer/footer';

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
