import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreateEventForm from './CreateEventForm';
import moment from 'moment';
import './modal.scss';
import { getArrOfErrorMessages } from './validation';
import { getFormattedTime, getDateTime } from '../../../src/utils/dateUtils.js';

const Modal = ({
  onHideForm,
  onCreateEvent,
  dateEvent,
  endTimeEvent,
  events,
}) => {
  const [{ id, title, description, date, startTime, endTime }, setFormData] =
    useState({
      id: Math.random(),
      title: '',
      description: '',
      date: moment(dateEvent).format('YYYY-MM-DD'),
      startTime: moment(endTimeEvent).subtract(1, 'hours').format('HH:mm'),
      endTime: moment(endTimeEvent).format('HH:mm'),
    });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const [hours, minutes] = value.split(':');

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'time' ? getFormattedTime(hours, minutes) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
        <div className="create-event">
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={description}
              onChange={handleChange}
            />
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
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
