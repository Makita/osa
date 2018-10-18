import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Socket from '../../services/socket';
import FormReader from '../../services/form_reader'

import Index from './index';
import AppointmentForm from './appointment_form';
import Services from './services';
import Schedule from './schedule';
import Appointment from './appointment';

class Content extends Component {
  state = {
    appointments: [],
    lastAppointment: {},
  };

  componentDidMount() {
    const socket = new Socket('/appointments');

    socket.get()
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

  handleSubmit = (event) => {
    event.preventDefault();

    const formReader = new FormReader();
    const data = formReader.getData();
    const urlEncode = Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    const socket = new Socket('/appointment');

    socket.post(urlEncode)
      .then((data) => {
        console.log(data);
        this.setState({
          appointments: this.state.appointments.concat(data),
          lastAppointment: data,
        });
        this.props.history.push('/show');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div id="content">
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/appointment' render={(props) => <AppointmentForm handleSubmit={this.handleSubmit} />} />
          <Route exact path='/schedule' render={(props) => <Schedule appointments={this.state.appointments} />} />
          <Route exact path='/show' render={(props) => <Appointment appointment={this.state.lastAppointment} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Content);