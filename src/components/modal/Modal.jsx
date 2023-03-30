import React from 'react';
import PropTypes from 'prop-types';
import EventForm from './EventForm';
import useModalState from '../../../src/hook/useModalState';
import moment from 'moment';
import './modal.scss';
import { getArrOfErrorMessages } from '../../../src/utils/validation.js';
import { getDateTime } from '../../../src/utils/dateUtils.js';

const Modal = ({
  onHideForm,
  onCreateEvent,
  dateEvent,
  endTimeEvent,
  events,
}) => {
  
  console.log(dateEvent, endTimeEvent);
  const [modalState, handleChange] = useModalState(dateEvent, endTimeEvent);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { id, title, description, date, startTime, endTime } = modalState;
    const dateFrom = getDateTime(date, startTime);
    const dateTo = getDateTime(date, endTime);

    if (getArrOfErrorMessages(dateFrom, dateTo, events).length) {
      alert(getArrOfErrorMessages(dateFrom, dateTo, events));
    } else {
      onCreateEvent({ id, title, description, dateFrom, dateTo });
      onHideForm();
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <button className="modal__close-btn" onClick={onHideForm}>
          +
        </button>
        <EventForm
          title={modalState.title}
          description={modalState.description}
          date={modalState.date}
          startTime={modalState.startTime}
          endTime={modalState.endTime}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onHideForm: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
  dateEvent: PropTypes.object,
  endTimeEvent: PropTypes.number,
  events: PropTypes.array.isRequired,
};

Modal.defaultProps = {
  dateEvent: moment(),
  endTimeEvent: moment().add(1, 'hour').valueOf(),
};

export default Modal;
