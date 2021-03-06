const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const Appointment = require('./appointment');
Appointment.make_db();

app.get('/appointments/all', (req, res) => {
  console.log("Received [GET] /appointments/all");
  Appointment.all((rows) => {
    res.status(200).send(rows);
  });
});

app.get('/appointments', (req, res) => {
  console.log("Received [GET] /appointments");
  Appointment.allAfterToday((rows) => {
    res.status(200).send(rows);
  });
});

app.post('/appointment', (req, res) => {
  console.log("Received [POST] /appointment");
  console.log("Params:", req.body);

  let appointment = new Appointment(
    req.body.first_name,
    req.body.last_name,
    req.body.phone_number,
    req.body.services,
    req.body.start_time,
    req.body.end_time
  );

  appointment.create(res, (row) => {
    res.status(200).send(req.body);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
