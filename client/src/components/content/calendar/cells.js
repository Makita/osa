import React, { Component } from 'react';
import DateFns from 'date-fns';

class CalendarCells extends Component {
  dayFormat = "D";

  render() {
    const { currentMonth, selectedDate, onDateClick } = this.props;
    const monthStart = DateFns.startOfMonth(currentMonth);
    const monthEnd = DateFns.endOfMonth(monthStart);
    const startDate = DateFns.startOfWeek(monthStart);
    const endDate = DateFns.endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while(day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = DateFns.format(day, this.dayFormat);
        const cloneDay = day;

        let cellClass = "";
        if(!DateFns.isSameMonth(day, monthStart)) cellClass = "disabled";
        else if(DateFns.isSameDay(day, selectedDate)) cellClass = "selected";

        days.push(
          <div
            className={`col cell ${cellClass}`}
            key={day}
            onClick={() => onDateClick(DateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = DateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  }
}

export default CalendarCells;