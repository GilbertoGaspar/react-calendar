import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function CalendarMonthView({
  MONTHS,
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
  displayMonth,
  setDisplayMonth,
  displayYear,
  setDisplayYear,
  hour,
  minute,
  amOrPm,
  setCurrentView
}) {
  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const [daysInMonth, setDaysInMonth] = useState(
    new Date(displayYear, displayMonth + 1, 0).getDate()
  );
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    new Date(displayYear, displayMonth, 1).getDay()
  );
  const [arrayOfDaysInMonth, setArrayOfDaysInMonth] = useState([]);

  useEffect(() => {
    setDaysInMonth(new Date(displayYear, displayMonth + 1, 0).getDate());
    setFirstDayOfMonth(new Date(displayYear, displayMonth, 1).getDay());
  }, [displayYear, displayMonth]);

  useEffect(() => {
    const handleSetDay = day => {
      setDay(day);
      setMonth(displayMonth);
      setYear(displayYear);
    };

    let blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(
        <td key={`empty${i}`} className='calendar__cell calendar__cell--empty'>
          {''}
        </td>
      );
    }
    let tempDaysInMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      tempDaysInMonth.push(
        <td
          key={i}
          className={
            i === day && year === displayYear && month === displayMonth
              ? 'calendar__cell calendar__cell--active'
              : 'calendar__cell'
          }
          onClick={() => handleSetDay(i)}
        >
          {i}
        </td>
      );
    }
    setArrayOfDaysInMonth([...blanks, ...tempDaysInMonth]);
  }, [
    day,
    month,
    year,
    displayMonth,
    displayYear,
    daysInMonth,
    firstDayOfMonth,
    setDay,
    setMonth,
    setYear
  ]);

  const handleSetDisplayMonth = addOrSum => {
    if (addOrSum === '+') {
      if (displayMonth === 11) {
        setDisplayMonth(0);
        setDisplayYear(displayYear + 1);
      } else {
        setDisplayMonth(displayMonth + 1);
      }
    } else if (addOrSum === '-') {
      if (displayMonth === 0) {
        setDisplayMonth(11);
        setDisplayYear(displayYear - 1);
      } else {
        setDisplayMonth(displayMonth - 1);
      }
    }
  };

  const handleClickTime = () => {
    setCurrentView('time');
  };

  const handleClickHeader = () => {
    setCurrentView('year');
  };

  return (
    <React.Fragment>
      <thead className='calendar__header'>
        <tr>
          <td
            className='calendar__cell'
            onClick={() => handleSetDisplayMonth('-')}
          >
            {'<'}
          </td>
          <th
            className='calendar__title calendar__cell'
            colSpan={5}
            onClick={handleClickHeader}
          >
            {`${MONTHS[displayMonth]} ${displayYear}`}
          </th>
          <td
            className='calendar__cell'
            onClick={() => handleSetDisplayMonth('+')}
          >
            {'>'}
          </td>
        </tr>
        <tr>
          {DAYS.map((day, i) => (
            <td key={i} className='calendar__title'>
              {day}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>{arrayOfDaysInMonth.slice(0, 7)}</tr>
        <tr>{arrayOfDaysInMonth.slice(7, 14)}</tr>
        <tr>{arrayOfDaysInMonth.slice(14, 21)}</tr>
        <tr>{arrayOfDaysInMonth.slice(21, 28)}</tr>
        <tr>{arrayOfDaysInMonth.slice(28, 35)}</tr>
        <tr>{arrayOfDaysInMonth.slice(35, 40)}</tr>
        <tr>
          <td
            className='calendar__title calendar__cell'
            colSpan={7}
            onClick={handleClickTime}
          >{`${hour}:${minute < 10 ? `0${minute}` : minute} ${amOrPm}`}</td>
        </tr>
      </tbody>
    </React.Fragment>
  );
}

CalendarMonthView.propTypes = {
  MONTHS: PropTypes.array.isRequired,
  month: PropTypes.number.isRequired,
  setMonth: PropTypes.func.isRequired,
  day: PropTypes.number.isRequired,
  setDay: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  setYear: PropTypes.func.isRequired,
  displayMonth: PropTypes.number.isRequired,
  setDisplayMonth: PropTypes.func.isRequired,
  displayYear: PropTypes.number.isRequired,
  setDisplayYear: PropTypes.func.isRequired,
  hour: PropTypes.number.isRequired,
  minute: PropTypes.number.isRequired,
  amOrPm: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired
};
