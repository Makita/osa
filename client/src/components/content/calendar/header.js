import React, { Component } from 'react';
import DateFns from 'date-fns';

class CalendarHeader extends Component {
  monthYearFormat = "MMMM YYYY";

  render() {
    const { prevMonth, nextMonth, currentMonth } = this.props;

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {DateFns.format(currentMonth, this.monthYearFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }
}

export default CalendarHeader;