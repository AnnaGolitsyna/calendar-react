import React from 'react';
import moment from 'moment';

import './header.scss';

const Header = ({ weekDates }) => {
 // console.log(weekDates);
  const displayedMonth = weekDates.reduce((acc, month) => {
    if (!acc.includes(moment(month).format('MMM'))) {
      acc.push(moment(month).format('MMM'));
    }
    return acc;
  }, []);
 // console.log(displayedMonth);
  return (
    <header className="header">
      <button className="button create-event-btn">
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button">Today</button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {displayedMonth.length === 1
            ? displayedMonth
            : `${displayedMonth[0]} - ${displayedMonth[1]}}`}
        </span>
      </div>
    </header>
  );
};

export default Header;
