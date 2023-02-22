import React, { useState } from 'react';
import Event from '../event/Event';
import Modal from '../modal/Modal';

import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  dataHour,
  dataDay,
  hourEvents,
  onDeleteEvent,
  onCreateEvent,
}) => {
  const [isModal, setModal] = useState(false);
  const [dataDayTime, setDataDayTime] = useState(dataDay);

  const showModal = (e) => {
    if (hourEvents.length) {
      return;
    }
    setModal(true);
    setDataDayTime((prevState) => {
      const newDate = new Date(prevState);
      const msInHour = 3600000;
      return newDate.setTime(
        dataDay.getTime() + (e.target.dataset.time - 1) * msInHour
      );
    });
  };

  const hideModul = () => {
    setModal(false);
  };

  return (
    <>
      <div
        className="calendar__time-slot"
        data-time={dataHour + 1}
        onClick={showModal}
      >
        {/* if no events in the current hour nothing will render here */}
        {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
          const eventStart = `${dateFrom.getHours()}:${formatMins(
            dateFrom.getMinutes()
          )}`;
          const eventEnd = `${dateTo.getHours()}:${formatMins(
            dateTo.getMinutes()
          )}`;

          return (
            <Event
              key={id}
              //calculating event height = duration of event in minutes
              height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
              marginTop={dateFrom.getMinutes()}
              dateFrom={dateFrom}
              time={`${eventStart} - ${eventEnd}`}
              title={title}
              id={id}
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

export default Hour;
