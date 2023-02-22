import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import events from './gateway/events.js';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const Main = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const changePrevtWeek = () => {
    let newStartDay = new Date();
    newStartDay.setTime(weekStartDate.getTime() - 86400000 * 7);
    setWeekStartDate(newStartDay);
  };

  const changeNextWeek = () => {
    let newStartDay = new Date();
    newStartDay.setTime(weekStartDate.getTime() + 86400000 * 7);
    setWeekStartDate(newStartDay);
  };

  const changeThisWeek = () => {
    const newStartDay = new Date();
    setWeekStartDate(newStartDay);
  };

  const [eventsInState, setEvents] = useState(events);

  const handleCreateEvents = (data) => {
    setEvents((prevState) => {
      return [...prevState, data];
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevState) => prevState.filter(({ id }) => id !== eventId));
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        onPrevWeek={changePrevtWeek}
        onNextWeek={changeNextWeek}
        onThisWeek={changeThisWeek}
        onCreateEvent={handleCreateEvents}
      />
      <Calendar
        weekDates={weekDates}
        events={eventsInState}
        onCreateEvent={handleCreateEvents}
        onDeleteEvent={handleDeleteEvent}
      />
    </>
  );
};

export default Main;
