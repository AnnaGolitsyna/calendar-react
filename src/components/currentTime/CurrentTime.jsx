import React from 'react';
import PropTypes from 'prop-types';
import './currentTime.scss';

const CurrentTime = ({ marginTop }) => {
  return <div className="red-line" style={{marginTop}}></div>;
};

CurrentTime.propTypes = {
  marginTop: PropTypes.number.isRequired,
};

export default CurrentTime;
