import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './index';
import AppointmentForm from './appointment_form';
import Services from './services';
import Schedule from './schedule';

class Content extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = props.handleSubmit;
  }

  render() {
    return (
      <div id="content">
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/appointment' render={(props) => <AppointmentForm handleSubmit={this.handleSubmit} />} />
          <Route exact path='/schedule' component={Schedule} />
        </Switch>
      </div>
    );
  }
}

export default Content;
