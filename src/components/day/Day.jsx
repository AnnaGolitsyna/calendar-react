import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({ dataDay, dayEvents, onDeleteEvent, onCreateEvent, events }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <>
      <div className="calendar__day" data-day={dataDay.getDate()}>
        {hours.map((hour) => {

          const hourEvents = dayEvents.filter(
            (event) => event.dateFrom.getHours() === hour
          );

          return (
            <Hour
              key={dataDay + hour}
              dataDay={dataDay}
              dataHour={hour}
              hourEvents={hourEvents}
              onDeleteEvent={onDeleteEvent}
              onCreateEvent={onCreateEvent}
              events={events}
            />
          );
        })}
      </div>
    </>
  );
};

Day.propTypes = {
  dataDay: PropTypes.object.isRequired,
  dayEvents: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default Day;
