const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const Appointment = require('./appointment');

app.get('/appointments', (req, res) => {
  console.log("Received [GET] /appointment");
  res.status(200).send(Appointment.allAfterToday());
});

app.post('/appointment', (req, res) => {
  console.log("Received [POST] /appointment");
  console.log("Params:", req.body);

  let appointment = new Appointment(
    req.body.first_name,
    req.body.last_name,
    req.body.phone_number,
    req.body.services,
    req.body.datetime
  );

  try {
    appointment.create();
    res.status(200).send(req.body);
  } catch(err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
