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
      oil_change: false,
      wheel_alignment: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Sends a POST request to the URL given
  // Should use Form Data object for data
  async post(url, data) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error("Server responded with a failure HTTP code: " + xhr.status + "."));
        }
      };
      xhr.onerror = () => {
        reject(new Error("Failed to POST to " + url + "."));
      };
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let services = Array.from(document.querySelectorAll("input[type=checkbox]"))
      .filter((option) => option.checked)
      .map((option) => option.value);
    let data = {
      first_name:   document.getElementById("formControlsFirstName").value,
      last_name:    document.getElementById("formControlsLastName").value,
      phone_number: document.getElementById("formControlsPhoneNumber").value,
      services:     services,
    };
    let urlEncode = Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    this.post('/appointment', urlEncode)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Navibar />
        <Content handleSubmit={this.handleSubmit}/>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
