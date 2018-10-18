import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import InfoRow from './shared/info_row';

class Appointment extends Component {
  render() {
    const {first_name, last_name, phone_number } = this.props.appointment;
    var { services, start_time, end_time } = this.props.appointment;
    const timeFormat = "MMMM Do, YYYY [at] hh:mm A";

    if(first_name === undefined) {
      this.props.history.push("/");
      return <div />;
    }

    services = services || '';
    services = services.replace(/,/g, ", ").replace(/_/g, ' ');
    start_time = moment(start_time).format(timeFormat) || '';
    end_time = moment(end_time).format(timeFormat) || '';

    return (
      <Panel bsStyle="info">
        <Panel.Heading>
          <Panel.Title>Your appointment was successfully booked!</Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <InfoRow name="Name" value={last_name + ", " + first_name} />
          <InfoRow name="Phone Number" value={phone_number} />
          <InfoRow name="Services Requested" value={services} />
          <InfoRow name="Start Time" value={start_time} />
          <InfoRow name="End Time" value={end_time} />
        </ListGroup>
      </Panel>
    );
  };
}

export default withRouter(Appointment);
