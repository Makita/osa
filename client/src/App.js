import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
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
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAppointments = this.getAppointments.bind(this);
  }

  componentDidMount() {
    this.getAppointments();
  }

  getAppointments() {
    this.get('/appointments')
      .then((data) => {
        console.log(data);
        this.setState({
          appointments: data,
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
    let startTime = document.getElementById("formControlsDate").value + " " + document.getElementById("formControlsTime").value;
    startTime = moment(startTime, "MM/DD/YYYY HH:mm").seconds(0);

    // TODO: Need to calculate how long the appointment will take based on services here
    let endTime = startTime;

    this.firstName   = document.getElementById("formControlsFirstName").value;
    this.lastName    = document.getElementById("formControlsLastName").value;
    this.phoneNumber = document.getElementById("formControlsPhoneNumber").value;
    this.services    = services;
    this.startTime   = startTime.format();
    this.endTime     = endTime.format();

    let data = {
      first_name:   this.firstName,
      last_name:    this.lastName,
      phone_number: this.phoneNumber,
      services:     this.services,
      start_time:    this.startTime,
      end_time:      this.endTime,
    };
    let urlEncode = Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    this.post('/appointment', urlEncode)
      .then((data) => {
        console.log(data);
        this.props.history.push('/show');
        this.setState({
          appointments: this.state.appointments.concat(data),
        });
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
        <Content
          handleSubmit={this.handleSubmit}
          appointments={this.state.appointments}
          getAppointments={this.getAppointments}
          firstName={this.firstName}
          lastName={this.lastName}
          phoneNumber={this.phoneNumber}
          services={this.services}
          startTime={this.startTime}
          endTime={this.endTime}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
