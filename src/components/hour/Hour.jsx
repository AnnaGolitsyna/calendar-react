import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import Modal from '../modal/Modal';
import CurrentTime from '../currentTime/CurrentTime';
import moment from 'moment';
import './hour.scss';

import {
  formatMins,
  getEndEventTimeInMs,
} from '../../../src/utils/dateUtils.js';

const Hour = ({
  dataHour,
  dataDay,
  hourEvents,
  showModal,
  onDeleteEvent,
  onCreateEvent,
  events,
}) => {
  // const [isShowModal, setStatusModal] = useState(false);
  const [endEventTime, setEndEventTime] = useState(dataDay);

  const handleShowModal = (e) => {
    if (hourEvents.length) {
      return;
    }
    showModal(true);
    setEndEventTime((prevState) =>
      getEndEventTimeInMs(e.target.dataset.time, prevState)
    );
  };

  const hideModul = () => {
    setStatusModal(false);
  };

  return (
    <>
      <div
        className="calendar__time-slot"
        data-time={dataHour + 1}
        onClick={handleShowModal}
      >
        {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
          const eventStart = `${moment(dateFrom).hour()}:${formatMins(
            moment(dateFrom).minute()
          )}`;
          const eventEnd = `${moment(dateTo).hour()}:${formatMins(
            moment(dateTo).minute()
          )}`;

          return (
            <Event
              key={id}
              height={
                (moment(dateTo).valueOf() - moment(dateFrom).valueOf()) /
                (1000 * 60)
              }
              marginTop={moment(dateFrom).minute()}
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
      {/* {isShowModal && (
        <Modal
          dateEvent={dataDay}
          endTimeEvent={endEventTime}
          
          onHideForm={hideModul}
          onCreateEvent={onCreateEvent}
          events={events}
        />
      )} */}
    </>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.object.isRequired,
  hourEvents: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default Hour;
