
import { useState } from 'react';
import moment from 'moment';
import { getFormattedTime } from '../../src/utils/dateUtils.js';

const useModalState = (dateEvent, endTimeEvent) => {
  const [modalState, setModalState] = useState({
    id: Math.random(),
    title: '',
    description: '',
    date: moment(dateEvent).format('YYYY-MM-DD'),
    startTime: moment(endTimeEvent).subtract(1, 'hours').format('HH:mm'),
    endTime: moment(endTimeEvent).format('HH:mm'),
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const [hours, minutes] = value.split(':');

    setModalState((prevData) => ({
      ...prevData,
      [name]: type === 'time' ? getFormattedTime(hours, minutes) : value,
    }));
  };

  return [modalState, handleChange];
};

export default useModalState;
