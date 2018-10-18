import React, { Component } from 'react';
import DateFns from 'date-fns';

class CalendarDays extends Component {
  dayNameFormat = "dddd";

  render() {
    const { currentMonth } = this.props;
    const days = [];

    let startDate = DateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {DateFns.format(DateFns.addDays(startDate, i), this.dayNameFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }
}

export default CalendarDays;