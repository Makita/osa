import moment from 'moment';

class FormReader {
  constructor() {
    let services = Array.from(document.querySelectorAll("input[type=checkbox]"))
      .filter((option) => option.checked)
      .map((option) => option.value);
    let startTime = document.getElementById("formControlsDate").value + " " + document.getElementById("formControlsTime").value;
    startTime = moment(startTime, "MM/DD/YYYY HH:mm").seconds(0);

    // TODO: Calculate end times
    let endTime = startTime;

    this.data = {
      first_name:   document.getElementById("formControlsFirstName").value,
      last_name:    document.getElementById("formControlsLastName").value,
      phone_number: document.getElementById("formControlsPhoneNumber").value,
      services:    services,
      start_time:   startTime.format(),
      end_time:     endTime.format(),
    };
  }

  getData() {
    return this.data;
  }
}

export default FormReader;