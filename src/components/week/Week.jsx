import React from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import moment from 'moment';
import './week.scss';

const Week = ({ weekDates, events, onDeleteEvent, onCreateEvent }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = moment(dayStart).add(1, 'day').toDate();
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart}
            dayEvents={dayEvents}
            onDeleteEvent={onDeleteEvent}
            onCreateEvent={onCreateEvent}
            events={events}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
};

export default Week;
