import React from 'react';
import PropTypes from 'prop-types';
import {
  startOfMonth,
  eachDayOfInterval,
  isMonday,
  previousMonday,
  endOfWeek,
  endOfMonth,
  format,
  getDate,
  getYear,
  isSameMonth,
  isEqual,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { nanoid } from 'nanoid';
import { capFirst, splitFunc } from './functions';

function Calendar({ date }) {
  const startDate = startOfMonth(date);

  const daysInMonth = eachDayOfInterval({
    start: isMonday(startDate) ? startDate : previousMonday(startDate),
    end: endOfWeek(endOfMonth(date), { weekStartsOn: 1 }),
  });

  const arrayOfDates = splitFunc(daysInMonth, 7);

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{capFirst(format(date, 'eeee', { locale: ru }))}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{getDate(date)}</div>
          <div className="ui-datepicker-material-month">{format(date, 'MMMM', { locale: ru })}</div>
          <div className="ui-datepicker-material-year">{getYear(date)}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {capFirst(format(date, 'LLLL', { locale: ru }))}
            {' '}
          </span>
          <span className="ui-datepicker-year">{format(date, 'yyyy')}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {
            arrayOfDates.map((el) => (
              <tr key={nanoid()}>
                {el.map((i) => (
                  <td
                    className={`${!isSameMonth(i, date) && 'ui-datepicker-other-month'}
                                ${isEqual(i, date) && 'ui-datepicker-today'}`}
                    key={nanoid()}
                  >
                    {getDate(i)}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  date: new Date(),
};

export default Calendar;
