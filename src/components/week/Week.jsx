import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from '../day/Day';
import './week.scss';

const Week = ({ weekDates, events, getDataModal, onDeleteEvent }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = moment(dayStart).add(1, 'day').toDate();
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={moment(dayStart).date()}
            dataDay={dayStart}
            dayEvents={dayEvents}
            getDataModal={getDataModal}
            onDeleteEvent={onDeleteEvent}
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
  getDataModal: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Week;
