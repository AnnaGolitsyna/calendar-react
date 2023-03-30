import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal';
import './style/common.scss';

import {
  fetchEventsList,
  fetchCreateEvent,
  fetchDeleteEvent,
} from './gateway/events.js';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';


const App = () => {
  
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [dataModal, setDataModal] = useState({
    status: false,
  });
  const [eventsInState, setEvents] = useState([]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const fetchEventForRender = () => {
    fetchEventsList().then((data) => {
      const eventsData = data.map(({ dateFrom, dateTo, ...rest }) => {
        return {
          ...rest,
          dateFrom: moment(dateFrom),
          dateTo: moment(dateTo),
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
    setDataModal({
      status: false,
    });
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        startDate={weekStartDate}
        getDataModal={setDataModal}
        setWeekStartDate={setWeekStartDate}
      />
      <Calendar
        weekDates={weekDates}
        events={eventsInState}
        getDataModal={setDataModal}
        onDeleteEvent={handleDeleteEvent}
      />
      {dataModal.status && (
        <Modal
          events={eventsInState}
          onHideForm={hideModal}
          onCreateEvent={handleCreateEvents}
          {...dataModal}
        />
      )}
    </>
  );
};

export default App;
