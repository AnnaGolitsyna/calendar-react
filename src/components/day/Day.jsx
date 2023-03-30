import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({ dataDay, dayEvents, showModal, onDeleteEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <>
      <div className="calendar__day" data-day={moment(dataDay).date()}>
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
};

export default Day;
