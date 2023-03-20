import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from '../modal/Modal';
import './header.scss';

const Header = ({
  weekDates,
  onPrevWeek,
  onNextWeek,
  onThisWeek,
  onCreateEvent,
}) => {
  const [isShowModal, setStatusModal] = useState(false);

  const showModal = () => {
    setStatusModal(true);
  };

  const hideModal = () => {
    setStatusModal(false);
  };

  const displayedMonths = weekDates.reduce((acc, month) => {
    const formatMonth = moment(month).format('MMMM YYYY');
    if (!acc.includes(formatMonth)) {
      acc.push(formatMonth);
    }
    return acc;
  }, []);

  return (
    <>
      <header className="header">
        <button className="button create-event-btn" onClick={showModal}>
          <i className="fas fa-plus create-event-btn__icon"></i>Create
        </button>
        <div className="navigation">
          <button
            className="navigation__today-btn button"
            onClick={() => {
              onThisWeek();
            }}
          >
            Today
          </button>
          <button
            className="icon-button navigation__nav-icon"
            onClick={() => {
              onPrevWeek();
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="icon-button navigation__nav-icon"
            onClick={() => {
              onNextWeek();
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <span className="navigation__displayed-month">
            {displayedMonths.length === 1
              ? displayedMonths
              : `${displayedMonths[0]} - ${displayedMonths[1]}`}
          </span>
        </div>
      </header>
      {isShowModal && (
        <Modal
          dateEvent={new Date()}
          endtTimeEvent={new Date()}
          onHideForm={hideModal}
          onCreateEvent={onCreateEvent}
        />
      )}
    </>
  );
};


Header.propType = {
  weekDates: PropTypes.array.isRequired,
  onPrevWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onThisWeek: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
};

export default Header;