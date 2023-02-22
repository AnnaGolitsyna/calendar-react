import React, { useState } from 'react';
import Hour from '../hour/Hour';
import Modal from '../modal/Modal';
import moment from 'moment';

import './day.scss';

const Day = ({ dataDay, dayEvents, onDeleteEvent, onCreateEvent }) => {
  const [isModal, setModal] = useState(false);
  const [dataDayTime, setDataDayTime] = useState(dataDay);


  const showModal = (e) => {
    setModal(true);
    setDataDayTime((prevState) => {
      const newDate = new Date(prevState);
      return newDate.setTime(
        dataDay.getTime() + (e.target.dataset.time - 1) * 3600000
      );
    });

  };

  const hideModul = () => {
    setModal(false);
  };

  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <>
      <div
        className="calendar__day"
        data-day={dataDay.getDate()}
        onClick={showModal}
      >
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
            />
          );
        })}
      </div>
      {isModal && (
        <Modal
          dateEvent={dataDay}
          startTimeEvent={dataDayTime}
          onHideForm={hideModul}
          onCreateEvent={onCreateEvent}
        />
      )}
    </>
  );
};

export default Day;
