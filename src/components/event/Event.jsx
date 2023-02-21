import React, { useState } from 'react';
import DeleteEvent from './deleteEvent/DeleteEvent';
import './event.scss';

const Event = ({
  height,
  marginTop,
  title,
  dateFrom,
  time,
  id,
  onDeleteEvent,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [isDeleted, setDelete] = useState(false);

  const isNotDelete = dateFrom - new Date() < 60000 * 15;

  const handleDeleteEvent = () => {
    if (isNotDelete) {
      alert("You can't delete this event. To late.");
    }
    setDelete(true);
    return id;
  };

  const hideDeleteBtn = () => {
    setDelete(false);
  };


  return (
    <>
      <div
        style={eventStyle}
        className="event"
        dataset={id}
        onClick={handleDeleteEvent}
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {isDeleted && (
        <DeleteEvent
          onDelete={() => onDeleteEvent(handleDeleteEvent())}
          onHide={hideDeleteBtn}
        />
      )}
    </>
  );
};

export default Event;
