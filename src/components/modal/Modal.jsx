import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './modal.scss';
import { getArrOfInvalidEventMessages } from './validation';

const Modal = ({ onHideForm, onCreateEvent, dateEvent, startTimeEvent }) => {
  const [{ id, title, description, date, startTime, endTime }, setFormData] =
    useState({
      id: Math.random(),
      title: '',
      description: '',
      date: moment(dateEvent).format('YYYY-MM-DD'),
      startTime: moment(startTimeEvent).format('HH:mm'),
      endTime: moment(startTimeEvent).format('HH:mm'),
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const nextState = { ...prevState, [name]: value };
      return nextState;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dateFrom = new Date(`${date} ${startTime}`);
    const dateTo = new Date(`${date} ${endTime}`);

    const isValidForm =
      getArrOfInvalidEventMessages(dateFrom, dateTo).length === 0;

    if (!isValidForm) {
      alert(getArrOfInvalidEventMessages(dateFrom, dateTo));
    } else {
      onCreateEvent({ id, title, description, dateFrom, dateTo });
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onHideForm}>
            +
          </button>
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

export default Modal;
