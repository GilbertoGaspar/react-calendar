import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext } from '../context/Store';

import CalendarTimeView from './CalendarTimeView';
import CalendarYearView from './CalendarYearView';
import CalendarDecadeView from './CalendarDecadeView';
import CalendarMonthView from './CalendarMonthView';

export default function Calendar() {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // VIEWS ['decade', 'year', 'month', 'time'];
  const [currentView, setCurrentView] = useState('month');

  const [, setCurrentAppointmentDate] = useContext(
    CalendarContext
  ).currentAppointmentDate;

  const [displayMonth, setDisplayMonth] = useState(0);
  const [displayYear, setDisplayYear] = useState(2019);

  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(2019);

  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [amOrPm, setAmOrPm] = useState('AM');

  // Sets date and time to the current date and time.
  useEffect(() => {
    const date = new Date();
    setDisplayMonth(date.getMonth());
    setDisplayYear(date.getFullYear());

    setMonth(date.getMonth());
    setDay(date.getDate());
    setYear(date.getFullYear());

    if (date.getHours() === 0) {
      setHour(12);
    } else {
      setHour(date.getHours() <= 12 ? date.getHours() : date.getHours() - 12);
    }
    setMinute(date.getMinutes());
    setAmOrPm(date.getHours() <= 12 ? 'AM' : 'PM');
  }, []);

  // Updates currentAppointmentDate upon updates to the appointment state.
  useEffect(() => {
    setCurrentAppointmentDate(
      `${MONTHS[month]} ${day} ${year}, ${hour}:${
        minute < 10 ? `0${minute}` : minute
      } ${amOrPm}`
    );
  }, [
    MONTHS,
    amOrPm,
    hour,
    minute,
    day,
    month,
    year,
    setCurrentAppointmentDate
  ]);

  return (
    <table className='calendar'>
      {currentView === 'time' && (
        <CalendarTimeView
          day={day}
          hour={hour}
          year={year}
          month={month}
          minute={minute}
          amOrPm={amOrPm}
          setHour={setHour}
          setMinute={setMinute}
          setAmOrPm={setAmOrPm}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'year' && (
        <CalendarYearView
          MONTHS={MONTHS}
          setDisplayMonth={setDisplayMonth}
          displayYear={displayYear}
          setDisplayYear={setDisplayYear}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'decade' && (
        <CalendarDecadeView
          displayYear={displayYear}
          setDisplayYear={setDisplayYear}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'month' && (
        <CalendarMonthView
          MONTHS={MONTHS}
          month={month}
          setMonth={setMonth}
          day={day}
          setDay={setDay}
          year={year}
          setYear={setYear}
          displayMonth={displayMonth}
          setDisplayMonth={setDisplayMonth}
          displayYear={displayYear}
          setDisplayYear={setDisplayYear}
          hour={hour}
          minute={minute}
          amOrPm={amOrPm}
          setCurrentView={setCurrentView}
        />
      )}
    </table>
  );
}
