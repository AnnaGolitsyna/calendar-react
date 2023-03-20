import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment.js';
import { days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const isToday =
          moment(dayDate).format('L') === moment(Date.now()).format('L');

        return (
          <div
            className="calendar__day-label day-label"
            key={dayDate.getTime()}
          >
            <span
              className={
                isToday
                  ? 'day-label__day-name day-label__day-name_today'
                  : 'day-label__day-name'
              }
            >
              {days[dayDate.getDay()]}
            </span>
            <span
              className={
                isToday
                  ? 'day-label__day-number day-label__day-number_today'
                  : 'day-label__day-number'
              }
            >
              {dayDate.getDate()}
            </span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;

