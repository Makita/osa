const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite3');

class Appointment {
  constructor(firstName, lastName, phoneNumber, services) {
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      services TEXT NOT NULL,
      datetime TEXT NOT NULL
    )`);

    this.first_name = firstName;
    this.last_name = lastName;
    this.phone_number = phoneNumber;
    this.services = services;
  }

  static allAfterToday() {
    var result = [];
    db.all(`SELECT first_name, last_name, phone_number, services, datetime
    FROM appointments
    WHERE datetime >= date('+1 day');`,
    (err, rows) => {
      result = rows;
    });
    return result;
  }

  validations() {
    this.validates_existence_of("first_name");
    this.validates_existence_of("last_name");
    this.validates_existence_of("phone_number");
    this.validates_existence_of("services");
    this.validates_existence_of("datetime");
  }

  validates_existence_of(prop) {
    if(this[prop] === undefined || typeof this[prop] === "string" && this[prop] === "") {
      throw prop + " cannot be blank.";
    }
  }

  create() {
    let query = db.prepare("INSERT INTO appointments (first_name, last_name, phone_number, services, datetime) VALUES (?, ?, ?, ?, ?)");
    this.validations();
    query.run(first_name, last_name, phone_number, services, datetime);
    query.finalize();
  }
}

module.exports = Appointment;
