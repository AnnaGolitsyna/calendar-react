import React from 'react';
import './navigation.scss';
import moment from 'moment/moment.js';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        
        if (moment(dayDate).format('L') === moment(Date.now()).format('L')) {
          return (
            <div
              className="calendar__day-today calendar__day-label day-label"
              key={dayDate.getTime()}
            >
              <span className="day-label__day-name" style={{ color: 'blue' }}>
                {days[dayDate.getDay()]}
              </span>
              <span className="day-label__day-number day-label__today">
                {dayDate.getDate()}
              </span>
            </div>
          );
        }
        return (
          <div
            className="calendar__day-label day-label"
            key={dayDate.getTime()}
          >
            <span className="day-label__day-name">
              {days[dayDate.getDay()]}
            </span>
            <span className="day-label__day-number">{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
