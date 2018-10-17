import React, { Component } from 'react';
import { Modal, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

function Appointments(props) {
  if(props.appointments.length === 0) return "No appointments have been made for this date.";

  return props.appointments.map((appointment) => {
    const timeSlot = moment(appointment.datetime).format("hh:mm A");
    const services = appointment.services.replace('_', ' ').replace(',', ", ");

    return (
      <Panel bsStyle="info" key={appointment.last_name + "," + appointment.datetime}>
        <Panel.Heading>
          <Panel.Title>{appointment.last_name}, {appointment.first_name}</Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <ListGroupItem>Time: {timeSlot}</ListGroupItem>
          <ListGroupItem>Services: {services}</ListGroupItem>
        </ListGroup>
      </Panel>
    );
  });
}

class ScheduleModal extends Component {
  componentWillReceiveProps(props) {
    this.dateString = moment(props.dateString).format("MMMM Do, YYYY");
    this.handleClose = props.handleClose;
    this.show = props.show;

    let appointments = props.appointments || [];
    const dayStart = moment(props.dateString).hours(9).minutes(0).seconds(0).milliseconds(0);
    const dayEnd = moment(props.dateString).hours(18).minutes(0).seconds(0).milliseconds(0);
    appointments = appointments.filter((appointment) => {
      const appTime = moment(appointment.datetime);
      return appTime >= dayStart && appTime <= dayEnd;
    });
    this.appointments = appointments || [];
  }

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Current Appointments for {this.dateString}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Appointments appointments={this.appointments} />
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
