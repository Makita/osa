import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

class ScheduleModal extends Component {
  componentWillReceiveProps(props) {
    this.dateString = moment.utc(props.dateString).format("MMMM Do, YYYY");
    this.handleClose = props.handleClose;
    this.show = props.show;

    let appointments = props.appointments;
    const dayStart = moment(props.dateString).milliseconds(0);
    const dayEnd = moment(props.dateString).milliseconds(0);
    appointments = appointments.filter((appointment) => {
      const appTime = moment(appointment.datetime);
      return appTime >= dayStart && appTime <= dayEnd;
    });
    this.appointments = appointments;
  }

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Current Appointments for {this.dateString}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.appointments}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ScheduleModal;
