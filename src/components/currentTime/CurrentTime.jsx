import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './currentTime.scss';

const CurrentTime = ({ dataDay, dataHour }) => {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [currentTime]);

  const isCurrentTime =
    moment(dataDay).format('L') === moment(currentTime).format('L') &&
    dataHour === moment(currentTime).hour();

  const currentMinute = moment(currentTime).minute(); 
  if (!isCurrentTime) {
    return null;
  }

  return <div className="red-line" style={{ marginTop: currentMinute }}></div>;
};

CurrentTime.propTypes = {
  dataDay: PropTypes.object.isRequired,
  dataHour: PropTypes.number.isRequired,
};

export default CurrentTime;
