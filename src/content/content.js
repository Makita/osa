import React, { Component } from 'react';

import Index from './index';
import AppointmentForm from './appointment_form.js';

class Content extends Component {
  render() {
    var content;

    if(this.props.page === "appointment") content = <AppointmentForm />;
    else content = <Index />;

    return (
      <div id="content">
        {content}
      </div>
    );
  }
}

export default Content;
