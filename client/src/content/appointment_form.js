import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

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
      phoneNumber: '',
      date: moment().add(1, 'days'),
      time: moment().add(1, 'days').hours(9).minutes(0).seconds(0),
    };

    this.handleSubmit = props.handleSubmit;
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  isSunday(date) {
    const day = date.day();
    return day !== 0;
  }

  formatPhoneNumber(e) {
    const src = e.target || e.srcElement;
    let cleanText = src.value.replace(/\D/g, '');
    cleanText = cleanText.slice(0,3)+"-"+cleanText.slice(3,6)+"-"+cleanText.slice(6);
    cleanText = cleanText.replace(/-$/, '').slice(0, 12);
    src.value = cleanText;
    this.setState({ phoneNumber: cleanText });
  }

  validatePhoneNumber() {
    const length = this.state.phoneNumber.length;
    if(length < 12 && length !== 0) return 'error';
    else if(length === 12) return 'success';
  }

  // Get the current moment and round it to the nearest multiple of 30
  handleDateChange(date) {
    this.setState({
      date: date,
    });
  }

  handleTimeChange(time) {
    this.setState({
      time: time,
    });
  }

  render() {
    const oilChangeTooltip = <Tooltip id="1">~30min</Tooltip>;
    return (
      <form onSubmit={this.handleSubmit}>
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
        <ControlLabel>Services Requested</ControlLabel>
        <FormGroup controlId="formControlsServices">
          <OverlayTrigger overlay={oilChangeTooltip}>
            <Checkbox inline value="oil_change">Oil change</Checkbox>
          </OverlayTrigger>
          <Checkbox inline value="wheel_alignment">Wheel alignment</Checkbox>
        </FormGroup>
        <FormGroup controlId="formControlsDate">
          <ControlLabel>Date</ControlLabel>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
            minDate={moment().add(1, 'days')}
            filterDate={this.isSunday}
            className="form-control"
            id="formControlsDate"
          />
        </FormGroup>
        <FormGroup controlId="formControlsTime">
          <ControlLabel>Time</ControlLabel>
          <DatePicker
            selected={this.state.time || moment().hours(9).minutes(0)}
            onChange={this.handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="HH:mm"
            minTime={moment().add(1, 'days').hours(9).minutes(0)}
            maxTime={moment().add(1, 'days').hours(18).minutes(0)}
            className="form-control"
            id="formControlsTime"
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit">Book Appointment</Button>
        </FormGroup>
      </form>
    );
  }
}

export default AppointmentForm;
