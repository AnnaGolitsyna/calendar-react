import React, {useState} from 'react';
import Event from '../event/Event';
import Modal from '../modal/Modal';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, onDeleteEvent, onCreateEvent }) => {
    const [isModal, setModal] = useState(false);

    const showModal = (e) => {
      console.log(e, dataHour, hourEvents);
      setModal(true);
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
        <Modal onHideForm={hideModul} onCreateEvent={onCreateEvent} />
      )}
    </>
  );
};

export default Hour;
