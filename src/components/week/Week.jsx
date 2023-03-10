import React from 'react';
import Day from '../day/Day';


import './week.scss';

const Week = ({ weekDates, events, onDeleteEvent, onCreateEvent }) => {


  return (

      <div className="calendar__week" >
        {weekDates.map((dayStart) => {
          const dayEnd = new Date(dayStart.getTime()).setHours(
            dayStart.getHours() + 24
          );

          //getting all events from the day we will render
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
            />
          );
        })}
      </div>


  );
};

export default Week;
