import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './header.scss';

const Header = ({ weekDates, startDate, setWeekStartDate, showModal }) => {

  const changePrevtWeek = () => {
    let newStartDay = moment(startDate);
    setWeekStartDate(moment(newStartDay).subtract(7, 'days'));
  };

  const changeNextWeek = () => {
    let newStartDay = moment(startDate);
    setWeekStartDate(moment(newStartDay).add(7, 'days'));
  };

  const changeThisWeek = () => {
    setWeekStartDate(moment());
  };

  const displayedMonths = weekDates.reduce((acc, month) => {
    const formatMonth = moment(month).format('MMMM YYYY');
    if (!acc.includes(formatMonth)) {
      acc.push(formatMonth);
    }
    return acc;
  }, []);

  const isOneMonth = displayedMonths.length === 1;

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => showModal(true)}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={changeThisWeek}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={changePrevtWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={changeNextWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {isOneMonth
            ? displayedMonths
            : `${displayedMonths[0]} - ${displayedMonths[1]}`}
        </span>
      </div>
    </header>
  );
};

Header.propType = {
  weekDates: PropTypes.array.isRequired,
  startDate: PropTypes.object.isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default Header;
