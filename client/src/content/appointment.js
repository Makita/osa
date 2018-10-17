import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class Appointment extends Component {
  componentWillReceiveProps(props) {
    const timeFormat = "MMMM Do, YYYY [at] hh:mm A";

    this.firstName   = props.firstName || '';
    this.lastName    = props.lastName || '';
    this.phoneNumber = props.phoneNumber || '';
    this.services    = (props.services || []).join(", ").replace(/_/g, ' ');
    this.startTime   = moment(props.startTime).format(timeFormat) || '';
    this.endTime     = moment(props.endTime).format(timeFormat) || '';
  }

  render() {
    if(this.firstName === "") {
      this.props.history.push("/");
      return <div />;
    }

    return (
      <Panel bsStyle="info">
        <Panel.Heading>
          <Panel.Title>Your appointment was successfully booked!</Panel.Title>
        </Panel.Heading>
        <ListGroup>
          <ListGroupItem>Name: {this.lastName}, {this.firstName}</ListGroupItem>
          <ListGroupItem>Phone Number: {this.phoneNumber}</ListGroupItem>
          <ListGroupItem>Services Requested: {this.services}</ListGroupItem>
          <ListGroupItem>Start Time: {this.startTime}</ListGroupItem>
          <ListGroupItem>End Time: {this.endTime}</ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}

export default withRouter(Appointment);
