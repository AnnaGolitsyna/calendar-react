import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';
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
  const [isShowModal, setStatusModal] = useState(false);
  const [eventsInState, setEvents] = useState([]);


  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));


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


  const hideModal = () => {
    setStatusModal(false);
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        startDate={weekStartDate}
        showModal={setStatusModal}
        setWeekStartDate={setWeekStartDate}

      />
      <Calendar
        weekDates={weekDates}
        events={eventsInState}
        onCreateEvent={handleCreateEvents}
        onDeleteEvent={handleDeleteEvent}
      />
      {isShowModal && (
        <Modal
          events={eventsInState}
          onHideForm={hideModal}
          onCreateEvent={handleCreateEvents}
        />
      )}
    </>
  );
};

export default App;
