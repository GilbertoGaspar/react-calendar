import React from 'react';
import PropTypes from 'prop-types';

export default function Appointment({ text, date }) {
  return (
    <div className='appointment'>
      <h3>{text}</h3>
      <p>{date}</p>
      <hr />
    </div>
  );
}

Appointment.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
