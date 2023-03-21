import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import Modal from '../modal/Modal';
import CurrentTime from '../currentTime/CurrentTime';
import moment from 'moment';
import './hour.scss';

import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  dataHour,
  dataDay,
  hourEvents,
  onDeleteEvent,
  onCreateEvent,
  events
}) => {
  const [isShowModal, setStatusModal] = useState(false);
  const [endEventTime, setEndEventTime] = useState(dataDay);

  const showModal = (e) => {
    if (hourEvents.length) {
      return;
    }
    setStatusModal(true);
    setEndEventTime((prevState) => {
      const newDate = new Date(prevState);
      const msInHour = 3600000;
      return newDate.setTime(
        dataDay.getTime() + (e.target.dataset.time) * msInHour
      );
    });
  };


  const hideModul = () => {
    setStatusModal(false);
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
        {<CurrentTime dataDay={dataDay} dataHour={dataHour} />}
      </div>
      {isShowModal && (
        <Modal
          dateEvent={dataDay}
          endTimeEvent={endEventTime}
          onHideForm={hideModul}
          onCreateEvent={onCreateEvent}
          events={events}
        />
      )}
    </>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.object.isRequired,
  hourEvents: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default Hour;
