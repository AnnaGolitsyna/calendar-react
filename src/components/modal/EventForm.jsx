import React from 'react';
import PropTypes from 'prop-types';

const EventForm = ({
  title,
  description,
  date,
  startTime,
  endTime,
  handleChange,
  handleSubmit,
}) => (
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
);

EventForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EventForm;
