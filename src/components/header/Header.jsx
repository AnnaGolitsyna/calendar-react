import React, { useState } from 'react';
import moment from 'moment';

import './header.scss';
import Modal from '../modal/Modal';

const Header = ({
  weekDates,
  onPrevWeek,
  onNextWeek,
  onThisWeek,
  onCreateEvent,
}) => {
  // create state => isModal: boolean +++
  // create handler => change state.isModal- onClick Heder/btn Create +++
  // open/close form - Modal +++

  const [isModal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModul = () => {
    setModal(false);
  };

  const displayedMonth = weekDates.reduce((acc, month) => {
    const formatMonth = moment(month).format('MMM');
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
            {displayedMonth.length === 1
              ? displayedMonth
              : `${displayedMonth[0]} - ${displayedMonth[1]}`}
          </span>
        </div>
      </header>
      {isModal && (
        <Modal onHideForm={hideModul} onCreateEvent={onCreateEvent} />
      )}
    </>
  );
};

export default Header;
