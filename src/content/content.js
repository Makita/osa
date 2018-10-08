import React, { Component } from 'react';

import Index from './index';
import AppointmentForm from './appointment_form.js';
import Services from './services';

class Content extends Component {
  render() {
    var content;

    if(this.props.page === "appointment") content = <AppointmentForm />;
    else if(this.props.page === "services") content = <Services />;
    else content = <Index />;

    return (
      <div id="content">
        {content}
      </div>
    );
  }
}

export default Content;
