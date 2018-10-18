const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite3');

class Appointment {
  constructor(firstName, lastName, phoneNumber, services, startTime, endTime) {
    this.first_name   = firstName;
    this.last_name    = lastName;
    this.phone_number = phoneNumber;
    this.services     = services;
    this.start_time   = startTime;
    this.end_time     = endTime;
  }

  static make_db() {
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      services TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL
    )`);
  }

  static all(callback) {
    db.all("SELECT first_name, last_name, phone_number, services, start_time, end_time FROM appointments;", (err, rows) => {
      if(err) console.log("Error:", err);
      else console.log("Appointment.all() call successful.");
      callback(rows);
    });
  }

  static allAfterToday(callback) {
    db.all(`SELECT first_name, last_name, phone_number, services, start_time, end_time
    FROM appointments
    WHERE start_time >= date('now', 'localtime', '+1 day');`,
    (err, rows) => {
      if(err) console.log("Error:", err);
      else console.log("Appointment.allAfterToday() call successful.");
      callback(rows);
    });
  }

  validations() {
    this.validates_existence_of("first_name");
    this.validates_existence_of("last_name");
    this.validates_existence_of("phone_number");
    this.validates_existence_of("services");
    this.validates_existence_of("start_time");
    this.validates_existence_of("end_time");
  }

  validates_existence_of(prop) {
    if(this[prop] === undefined || typeof this[prop] === "string" && this[prop] === "") {
      throw prop + " cannot be blank.";
    }
  }

  create(res, callback) {
    this.validations();
    console.log("Validations all passed.")

    db.run(
      "INSERT INTO appointments (first_name, last_name, phone_number, services, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)",
      [this.first_name, this.last_name, this.phone_number, this.services, this.start_time, this.end_time],
      function(err) {
        if(err) {
          console.log("Error:", err);
          res.status(500).send(err);
        } else {
          console.log(this.changes + " rows were added.");
          callback(this.changes);
        }
      }
    );
  }
}

module.exports = Appointment;
