import React, { Component } from 'react';
import { Modal, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

import InfoRow from './shared/info_row';

function Appointments(props) {
  if(props.appointments.length === 0) return "No appointments have been made for this date.";

  return props.appointments.map((appointment, i) => {
    const timeFormat = "hh:mm A";
    const startTime = moment(appointment.start_time).format(timeFormat);
    const endTime = moment(appointment.end_time).format(timeFormat);
    const services = appointment.services.replace(/_/g, ' ').replace(/,/g, ", ");

    return (
      <Panel bsStyle="info" key={appointment.last_name + appointment.start_time + i}>
        <Panel.Heading>
          <Panel.Title>{appointment.last_name}, {appointment.first_name}</Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <InfoRow name="Contact Number" value={appointment.phone_number} />
          <InfoRow name="Start Time" value={startTime} />
          <InfoRow name="End Time" value={endTime} />
          <InfoRow name="Services" value={services} />
        </ListGroup>
      </Panel>
    );
  });
}

class ScheduleModal extends Component {
  render() {
    const { dateString, handleClose, show } = this.props;

    const selectedDate = moment(dateString).format("MMMM Do, YYYY");

    let appointments = this.props.appointments || [];
    const dayStart = moment(dateString).hours(9).minutes(0).seconds(0).milliseconds(0);
    const dayEnd = moment(dateString).hours(18).minutes(0).seconds(0).milliseconds(0);
    appointments = appointments.filter((appointment) => {
      const appTime = moment(appointment.start_time);
      return appTime >= dayStart && appTime <= dayEnd;
    });

    return (
      <div className="static-modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Current Appointments for {selectedDate}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Appointments appointments={appointments} />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ScheduleModal;
