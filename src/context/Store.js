import React, { useState, createContext } from 'react';

export const CalendarContext = createContext();

export default function Store(props) {
  const appointments = useState([]);
  const currentAppointmentText = useState('');
  const currentAppointmentDate = useState('');

  return (
    <CalendarContext.Provider
      value={{ appointments, currentAppointmentText, currentAppointmentDate }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}
