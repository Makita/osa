import React, { Component } from 'react';
import DateFns from 'date-fns';

import CalendarHeader from './calendar/header';
import CalendarDays from './calendar/days';
import CalendarCells from './calendar/cells';

import ScheduleModal from './schedule_modal';

class Schedule extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    showModal: false,
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  onDateClick = (day) => {
    let selected = DateFns.parse(this.state.currentMonth);
    selected = DateFns.setDate(selected, DateFns.getDate(day));

    this.dateString = DateFns.format(selected);

    this.setState({
      selectedDate: day,
      showModal: true,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: DateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: DateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className="calendar">
          <CalendarHeader
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
            currentMonth={this.state.currentMonth}
          />
          <CalendarDays
            currentMonth={this.state.currentMonth}
          />
          <CalendarCells
            currentMonth={this.state.currentMonth}
            selectedDate={this.state.selectedDate}
            onDateClick={this.onDateClick}
          />
        </section>
        <ScheduleModal
          dateString={this.dateString}
          show={this.state.showModal}
          handleClose={this.handleClose}
          appointments={this.props.appointments}
        />
      </React.Fragment>
    );
  }
}

export default Schedule;
