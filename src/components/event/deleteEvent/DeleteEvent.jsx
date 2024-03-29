import React from 'react';
import PropTypes from 'prop-types';
import './deleteEvent.scss';

const DeleteEvent = ({ onDelete, onHide }) => {
  return (
    <div className="delete-event">
      <button className="delete-event__hide-btn" onClick={onHide}>+</button>
      <button className="delete-event-btn" onClick={onDelete}>
        <i className="fa-solid fa-trash delete-event-btn__icon" />
        <span className="delete-event-btn__text">Delete</span>
      </button>
    </div>
  );
};

DeleteEvent.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default DeleteEvent;
