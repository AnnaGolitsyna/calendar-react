import React from 'react';
import Hour from '../hour/Hour';

import './day.scss';

const Day = ({ dataDay, dayEvents, onDeleteEvent, onCreateEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

    const showTime = (e) => {
      console.log(e, dataDay, e.target.dataset.time);
    }

  return (
    <div className="calendar__day" data-day={dataDay} onClick={showTime}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            onDeleteEvent={onDeleteEvent}
            onCreateEvent={onCreateEvent}
          />
        );
      })}
    </div>
  );
};

export default Day;
