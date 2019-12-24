import React, { useContext } from 'react';
import Store, { CalendarContext } from './context/Store';
import Calendar from './components/Calendar';
import Appointment from './components/Appointment';
import './App.css';

export default function AppWrapper() {
  // Store, renders the provider, so the context will be accessible from App.
  return (
    <Store>
      <App />
    </Store>
  );
}

function App() {
  const [appointments, setAppointments] = useContext(
    CalendarContext
  ).appointments;
  const [currentAppointmentText, setCurrentAppointmentText] = useContext(
    CalendarContext
  ).currentAppointmentText;
  const [currentAppointmentDate] = useContext(
    CalendarContext
  ).currentAppointmentDate;

  const handleAddAppointment = () => {
    if (currentAppointmentText) {
      setAppointments(
        appointments.concat({
          appointmentText: currentAppointmentText,
          date: currentAppointmentDate
        })
      );
    } else {
      alert('Please add a title to your appointment.');
    }
  };

  const handleAppointmentTextChange = e => {
    setCurrentAppointmentText(e.target.value);
  };

  return (
    <div className='app'>
      <h1>React Calendar</h1>
      <h2>Make a new appointment</h2>
      <input
        className='app__input'
        type='text'
        placeholder='Your appointment title'
        value={currentAppointmentText}
        onChange={handleAppointmentTextChange}
      ></input>
      <Calendar />
      <br />
      <button className='app__button' onClick={handleAddAppointment}>
        Add Appointment
      </button>
      <h1>Appointments</h1>
      <hr />
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <Appointment
            key={index}
            text={appointment.appointmentText}
            date={appointment.date}
          />
        ))
      ) : (
        <h2>No appointments!</h2>
      )}
    </div>
  );
}
