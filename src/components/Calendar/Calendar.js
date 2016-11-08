// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import s from './Calendar.css';

type CalendarEventType = {
  title: string,
  slug: string,
  startDate: Date,
  endDate?: Date
};

type CalendarPropsType = {
  date: ?Date,
  type: 'full' | 'popup',
  events?: Array<CalendarEventType>
}

// TODO: Add bg holidays as recurrent events
class Calendar extends Component {
  props: CalendarPropsType;

  static defaultProps: {
    date: Date,
    events: ?Array<CalendarEventType>
  };

  constructor(props: CalendarPropsType) {
    super(props);

    this.state = {
      date: this.props.date || new Date()
    };
  }

  state: {
    date: Date
  };

  addMonths(date: Date, months: number, move: -1 | 0 | 1) {
    let newMonth = (date.getMonth() + months);
    date.setMonth(newMonth);
    newMonth %= 12;

    if (newMonth > -1 && newMonth !== date.getMonth()) date.setDate(0);
    if (move) {
      if (move === -1) {
        date.setDate(1);
      } else {
        date.setMonth(++newMonth);
        date.setDate(0);
        if (newMonth === date.getMonth()) date.setDate(0);
      }
    }
  }

  /*addWeeks(date: Date, weeks: number, move: -1 | 0 | 1) {
    let totalDays = date.getDate() + (7 * weeks);
    switch (move) {
      case -1: totalDays -= (date.getDay() || 7) - 1; break;
      case 1: totalDays += 7 - (date.getDay() || 7); break;
      default: break;
    }
    date.setDate(totalDays);
  }*/

  /*addDays(date: Date, days: number, move: -1 | 0 | 1) {
    date.setDate(date.getDate() + days);
    if (move === -1) date.setHours(0, 0, 0, 0);
    else if (move === 1) date.setHours(23, 59, 59, 999);
  }*/

  getMonthName(month: number): string {
    switch (month) {
      case 0: return 'Януари';
      case 1: return 'Февруари';
      case 2: return 'Март';
      case 3: return 'Април';
      case 4: return 'Май';
      case 5: return 'Юни';
      case 6: return 'Юли';
      case 7: return 'Август';
      case 8: return 'Септември';
      case 9: return 'Октомври';
      case 10: return 'Ноември';
      case 11: return 'Декември';
      default: return '';
    }
  }

  // Unused
  /*getDayName(day: number): string {
    switch (day) {
      case 1: return 'Понеделник';
      case 2: return 'Вторник';
      case 3: return 'Сряда';
      case 4: return 'Четвъртък';
      case 5: return 'Петък';
      case 6: return 'Събота';
      case 0: return 'Неделя';
      default: return '';
    }
  }*/

  getDayNumber(date: Date) : number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.ceil(diff / oneDay);
  }

  getWeekNumber(date: Date) : number {
    const d = new Date(date);
    d.setHours(0, 0, 0);
    d.setMilliseconds(0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
  }

  getFormattedTime(time : Date) : string {
    return `${time.getDate()} ${this.getMonthName(time.getMonth())}`;
  }

  getNextEvent(date: Date): ?CalendarEventType {
    let nextEvent = null;
    if (this.props.events) {
      for (const event of this.props.events) {
        if (event.startDate > date && (nextEvent == null || event.startDate < nextEvent.startDate)) {
          nextEvent = event;
        }
      }
    }
    return nextEvent;
  }

  getCalendarHead(): React.Element<*> {
    return (
      <thead>
        <tr>
          <td>Пон</td>
          <td>Вт</td>
          <td>Ср</td>
          <td>Чет</td>
          <td>Пет</td>
          <th>Съб</th>
          <th>Нед</th>
        </tr>
      </thead>
    );
  }

  getCalendarBody() {
    const start = new Date(this.state.date);
    this.addMonths(start, 0, -1); // start of month
    const end = new Date(this.state.date);
    this.addMonths(end, 0, 1); // end of month
    const startWeekNumber = this.getWeekNumber(start);
    const startDayNumber = this.getDayNumber(start);
    const body: Array<Array<React.Element<*>>> = [new Array(7)];

    // Group all events for given month by day
    const monthlyEvents = {};
    if (this.props.events) {
      this.props.events.forEach((event: CalendarEventType) => {
        if (event.startDate > start && event.startDate < end) {
          const day = event.startDate.getDate();
          if (!monthlyEvents[day]) monthlyEvents[day] = [];
          monthlyEvents[day].push(event);
        }
      });
    }

    let week = 0;

    let dayOfWeek = start.getDay() || 7;
    for (let i = 1; i < dayOfWeek; i++) {
      body[week].push(i < 6 ? <td key={startDayNumber - i} /> : <th key={startDayNumber - i} />);
    }

    const today = new Date();
    const isCurrentMonth = today.getMonth() === start.getMonth();
    const currentDay = today.getDate();
    const maxDate = end.getDate();
    for (let i = 0; i < maxDate; i++) {
      const day = i + 1;
      const hasEvents = monthlyEvents.hasOwnProperty(day);
      const attr = {
        key: startDayNumber + i,
        title: null,
        className: cx({ today: isCurrentMonth && day === currentDay, hasEvents })
      };
      let child = day;
      if (hasEvents) {
        let link = '/events';
        if (monthlyEvents[day].length > 1) {
          attr.title = `${monthlyEvents[day].length} събития`;
          link += `?date=${start.toISOString().slice(0, 10)}`;
        } else {
          attr.title = monthlyEvents[day][0].title;
          link += `/${monthlyEvents[day][0].slug}`;
        }
        child = <Link to={link}>{child}</Link>;
      }
      body[week].push(dayOfWeek < 6 ? <td {...attr}>{child}</td> : <th {...attr}>{child}</th>);

      if (++dayOfWeek > 7 && day < maxDate) {
        dayOfWeek = 1;
        week++;
        body.push(new Array(7));
      }
    }

    for (let i = dayOfWeek; i <= 7; i++) {
      body[week].push(i < 6 ? <td key={maxDate + i} /> : <th key={maxDate + i} />);
    }

    return (
      <tbody>
        {body.map((weekObj: Array<React.Element<*>>, i: number): React.Element<*> =>
          <tr key={startWeekNumber + i}>
            {weekObj}
          </tr>
        )}
      </tbody>
    );
  }

  getUpcomingEvent() {
    const nextEvent = this.getNextEvent(this.state.date);
    if (nextEvent) {
      return (
        <div className={s.upcoming}>
          <strong>Следва: </strong>
          <Link to={nextEvent.slug} title={nextEvent.title}>
            {`${nextEvent.title} - ${this.getFormattedTime(nextEvent.startDate)}`}
          </Link>
        </div>
      );
    }
    return null;
  }

  adjustMonth(dir: -1 | 1) {
    this.addMonths(this.state.date, dir, 0);
    this.setState({ date: this.state.date });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.title}>
          <a
            className={s.prevNext}
            onClick={this.adjustMonth.bind(this, -1)}
          >
            &laquo;
          </a>
          <span className={s.month}>{this.getMonthName(this.state.date.getMonth())}</span>
          <a
            className={s.prevNext}
            onClick={this.adjustMonth.bind(this, 1)}
          >
            &raquo;
          </a>
          <small className={s.year}>{this.state.date.getFullYear()}</small>
        </div>
        <div className={s.agenda}>
          <table>
            {this.getCalendarHead()}
            {this.getCalendarBody()}
          </table>
          {this.getUpcomingEvent()}
        </div>
      </div>
    );
  }
}

export default Calendar;
