import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './index';
import AppointmentForm from './appointment_form';
import Services from './services';
import Schedule from './schedule';
import Appointment from './appointment';

class Content extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = props.handleSubmit;
    this.handleSave = props.handleSave;
    this.getAppointments = props.getAppointments;
  }

  componentWillReceiveProps(props) {
    this.appointments = props.appointments;

    this.firstName   = props.firstName;
    this.lastName    = props.lastName;
    this.phoneNumber = props.phoneNumber;
    this.services    = props.services;
    this.startTime   = props.startTime;
    this.endTime     = props.endTime;
  }

  render() {
    return (
      <div id="content">
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/appointment' render={(props) => <AppointmentForm handleSubmit={this.handleSubmit} />} />
          <Route exact path='/schedule' render={(props) => <Schedule appointments={this.appointments} getAppointments={this.getAppointments} />} />
          <Route
            exact
            path='/show'
            render={(props) => (
              <Appointment
                firstName={this.firstName}
                lastName={this.lastName}
                phoneNumber={this.phoneNumber}
                services={this.services}
                startTime={this.startTime}
                endTime={this.endTime}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Content;
