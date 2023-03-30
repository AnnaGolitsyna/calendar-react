import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({ dataDay, dayEvents, getDataModal, onDeleteEvent }) => {
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
              getDataModal={getDataModal}
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
  getDataModal: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Day;
