import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

function FieldGroup({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class AppointmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: ''
    };
  }

  formatPhoneNumber(e) {
    let src = e.target || e.srcElement;
    let cleanText = src.value.replace(/\D/g, '');
    cleanText = cleanText.slice(0,3)+"-"+cleanText.slice(3,6)+"-"+cleanText.slice(6);
    cleanText = cleanText.replace(/-$/, '').slice(0, 12);
    src.value = cleanText;
    this.setState({ phoneNumber: cleanText });
  }

  validatePhoneNumber() {
    const length = this.state.phoneNumber.length;
    if(length < 12 && length != 0) return 'error';
    else if(length == 12) return 'success';
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <FieldGroup
          id="formControlsFirstName"
          type="text"
          label="First Name"
          placeholder="Jason"
        />
        <FieldGroup
          id="formControlsLastName"
          type="text"
          label="Last Name"
          placeholder="Choi"
        />
        <FormGroup controlId="formControlsPhoneNumber" validationState={this.validatePhoneNumber()}>
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            type="tel"
            label="Phone Number"
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={this.formatPhoneNumber.bind(this)}
          />
        </FormGroup>
        <FormGroup controlId="formControlsDescriptionProblem">
          <ControlLabel>Service Requested</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Eg. Oil change." />
          <HelpBlock>Please be advised that a call should be made instead for services that require substantial amounts of time.</HelpBlock>
        </FormGroup>
        <FormGroup>
          <Button type="submit">Book Appointment</Button>
        </FormGroup>
      </form>
    );
  }
}

export default AppointmentForm;
