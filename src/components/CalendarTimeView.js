import React from 'react';
import PropTypes from 'prop-types';

export default function CalendarTimeView({
  day,
  year,
  month,
  hour,
  minute,
  amOrPm,
  setHour,
  setMinute,
  setAmOrPm,
  setCurrentView
}) {
  const handleHourChange = addOrSub => {
    if (addOrSub === '+') {
      if (hour === 12) {
        setHour(1);
      } else {
        setHour(hour + 1);
      }
    } else if (addOrSub === '-') {
      if (hour === 1) {
        setHour(12);
      } else {
        setHour(hour - 1);
      }
    }
  };
  const handleMinuteChange = addOrSub => {
    if (addOrSub === '+') {
      if (minute === 59) {
        setMinute(0);
      } else {
        setMinute(minute + 1);
      }
    } else if (addOrSub === '-') {
      if (minute === 0) {
        setMinute(59);
      } else {
        setMinute(minute - 1);
      }
    }
  };
  const handleAmOrPmChange = () => {
    if (amOrPm === 'AM') {
      setAmOrPm('PM');
    } else {
      setAmOrPm('AM');
    }
  };

  const handleViewChange = () => {
    setCurrentView('month');
  };

  return (
    <React.Fragment>
      <thead className='calendar__header'>
        <tr>
          <th
            className='calendar__title calendar__cell'
            onClick={handleViewChange}
          >
            {month + 1}/{day}/{year}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='time__data'>
            <div className='time__row'>
              <span
                className='time__cell calendar__cell'
                onClick={() => handleHourChange('+')}
              >
                ▲
              </span>
              <p>{hour <= 12 ? hour : hour - 12}</p>
              <span
                className='time__cell calendar__cell'
                onClick={() => handleHourChange('-')}
              >
                ▼
              </span>
            </div>
            <div className='time__separator'>:</div>
            <div className='time__row'>
              <span
                className='time__cell calendar__cell'
                onClick={() => handleMinuteChange('+')}
              >
                ▲
              </span>
              <p>{minute < 10 ? `0${minute}` : minute}</p>
              <span
                className='time__cell calendar__cell'
                onClick={() => handleMinuteChange('-')}
              >
                ▼
              </span>
            </div>
            <div className='time__row'>
              <span
                className='time__cell calendar__cell'
                onClick={handleAmOrPmChange}
              >
                ▲
              </span>
              <p>{amOrPm}</p>
              <span
                className='time__cell calendar__cell'
                onClick={handleAmOrPmChange}
              >
                ▼
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
}

CalendarTimeView.propTypes = {
  day: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  hour: PropTypes.number.isRequired,
  minute: PropTypes.number.isRequired,
  amOrPm: PropTypes.string.isRequired,
  setHour: PropTypes.func.isRequired,
  setMinute: PropTypes.func.isRequired,
  setAmOrPm: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired
};
