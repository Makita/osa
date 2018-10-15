import React, { Component } from 'react';
import DateFns from 'date-fns';

import ScheduleModal from './schedule_modal';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      showModal: false,
    };

    this.monthYearFormat = "MMMM YYYY";
    this.dayNameFormat = "dddd";
    this.dayFormat = "D";
    this.fullFormat = "MMMM D, YYYY";

    this.modal = "";

    this.handleClose = this.handleClose.bind(this);
  }

  renderHeader() {
    return(
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth.bind(this)}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {DateFns.format(this.state.currentMonth, this.monthYearFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth.bind(this)}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const days = [];
    let startDate = DateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {DateFns.format(DateFns.addDays(startDate, i), this.dayNameFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
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
            onClick={() => this.onDateClick(DateFns.parse(cloneDay))}
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

  handleClose() {
    this.setState({
      showModal: false
    });
  }

  onDateClick(day) {
    let selected = DateFns.parse(this.state.currentMonth);
    selected = DateFns.setDate(selected, DateFns.getDate(day));
    this.dateString = DateFns.format(selected, this.fullFormat);

    this.setState({
      selectedDate: day,
      showModal: true,
    });
  }

  nextMonth() {
    this.setState({
      currentMonth: DateFns.addMonths(this.state.currentMonth, 1)
    });
  }

  prevMonth() {
    this.setState({
      currentMonth: DateFns.subMonths(this.state.currentMonth, 1)
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </section>
        <ScheduleModal dateString={this.dateString} show={this.state.showModal} handleClose={this.handleClose} />
      </React.Fragment>
    );
  }
}

export default Schedule;
