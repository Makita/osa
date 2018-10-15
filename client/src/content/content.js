import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './index';
import AppointmentForm from './appointment_form';
import Services from './services';
import Schedule from './schedule';

class Content extends Component {
  render() {
    return (
      <div id="content">
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/appointment' component={AppointmentForm} />
          <Route exact path='/schedule' component={Schedule} />
        </Switch>
      </div>
    );
  }
}

export default Content;
