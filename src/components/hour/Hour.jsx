import React from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import CurrentTime from '../currentTime/CurrentTime';
import moment from 'moment';
import './hour.scss';

import {
  formatMins,
  getEndEventTimeInMs,
} from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, dataDay, hourEvents, showModal, onDeleteEvent }) => {

  const handleShowModal = e => {
  console.log(dataDay, e.target.dataset.time);
  if (hourEvents.length) {
    return;
  }
  showModal({
    dateEvent: dataDay,
    endTimeEvent: getEndEventTimeInMs(e.target.dataset.time, dataDay),
  });
}

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
    </>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.object.isRequired,
  hourEvents: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Hour;
