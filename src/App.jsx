import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import {
  fetchEventsList,
  fetchCreateEvent,
  fetchDeleteEvent,
} from './gateway/events.js';

import {
  getWeekStartDate,
  generateWeekRange,
  getFormattedDateAfterFetch,
} from '../src/utils/dateUtils.js';

import './style/common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [eventsInState, setEvents] = useState([]);

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

  const fetchEventForRender = () => {
    fetchEventsList().then((data) => {
      const eventsData = data.map(({ dateFrom, dateTo, ...rest }) => {
        return {
          ...rest,
          dateFrom: getFormattedDateAfterFetch(dateFrom),
          dateTo: getFormattedDateAfterFetch(dateTo),
        };
      });
      setEvents(eventsData);
    });
  };

  useEffect(() => {
    fetchEventForRender();
  }, []);

  const handleCreateEvents = (eventData) => {
    fetchCreateEvent(eventData).then(() => fetchEventForRender());
  };

  const handleDeleteEvent = (eventId) => {
    fetchDeleteEvent(eventId).then(() => fetchEventForRender());
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        events={eventsInState}
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



export default App;
