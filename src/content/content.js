import React, { Component } from 'react';

import Index from './index';
import AppointmentForm from './appointment_form';
import Services from './services';
import Schedule from './schedule';

class Content extends Component {
  render() {
    var content;

    switch(this.props.page) {
      case "appointment":
        content = <AppointmentForm />
        break;
      case "services":
        content = <Services />
        break;
      case "schedule":
        content = <Schedule />
        break;
      default:
        content = <Index />
        break;
    }

    return (
      <div id="content">
        {content}
      </div>
    );
  }
}

export default Content;
