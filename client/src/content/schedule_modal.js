import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ScheduleModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(props) {
    this.dateString = props.dateString;
    this.handleClose = props.handleClose;
    this.setState({
      show: props.show,
    });
  }

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Current Appointments for {this.dateString}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Appointments would be listed here
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
