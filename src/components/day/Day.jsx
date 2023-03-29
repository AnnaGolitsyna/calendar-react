import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({
  dataDay,
  dayEvents,
  showModal,
  onDeleteEvent,
  onCreateEvent,
  events,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <>
      <div
        className="calendar__day"
        data-day={moment(dataDay).date()}
        onClick={(e) => {
          console.log(e.target, dataDay);
        }}
      >
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter(
            (event) => moment(event.dateFrom).hour() === hour
          );

          return (
            <Hour
              key={dataDay + hour}
              dataDay={dataDay}
              dataHour={hour}
              hourEvents={hourEvents}
              showModal={showModal}
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
  showModal: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default Day;
