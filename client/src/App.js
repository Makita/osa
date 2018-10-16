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
      appointments: [],
      oil_change: false,
      wheel_alignment: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.get('/appointments')
      .then((data) => {
        console.log(data);
        this.setState({
          appointments: data || [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Sends a GET request to the URL given
  async get(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.response));
        }
      };
      xhr.onerror = () => {
        reject(new Error("Failed to GET to " + url + "."));
      };
      xhr.send();
    });
  }

  // Sends a POST request to the URL given
  // Hash for data
  async post(url, data) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.response));
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
      datetime:     document.getElementById("formControlsDate").value + " " + document.getElementById("formControlsTime").value,
    };
    let urlEncode = Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    this.post('/appointment', urlEncode)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Navibar />
        <Content handleSubmit={this.handleSubmit} appointments={this.state.appointments} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
