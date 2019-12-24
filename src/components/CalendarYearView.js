import React from 'react';
import PropTypes from 'prop-types';

export default function CalendarYearView({
  MONTHS,
  setDisplayMonth,
  displayYear,
  setDisplayYear,
  setCurrentView
}) {
  const handleSetDisplayYear = addOrSub => {
    if (addOrSub === '+') {
      setDisplayYear(displayYear + 1);
    } else if (addOrSub === '-') {
      setDisplayYear(displayYear - 1);
    }
  };

  const handleSetDisplayMonth = month => {
    setDisplayMonth(MONTHS.indexOf(month));
    setCurrentView('month');
  };
  const handleViewChange = () => {
    setCurrentView('decade');
  };

  return (
    <React.Fragment>
      <thead className='calendar__header'>
        <tr>
          <td
            className='calendar__cell'
            onClick={() => handleSetDisplayYear('-')}
          >
            {'<'}
          </td>
          <th
            className='calendar__title calendar__cell'
            colSpan={2}
            onClick={handleViewChange}
          >
            {displayYear}
          </th>
          <td
            className='calendar__cell'
            onClick={() => handleSetDisplayYear('+')}
          >
            {'>'}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          {MONTHS.slice(0, 4).map((month, i) => (
            <td
              key={i}
              className='calendar__cell year__cell'
              onClick={() => handleSetDisplayMonth(month)}
            >
              {month.slice(0, 3)}
            </td>
          ))}
        </tr>
        <tr>
          {MONTHS.slice(4, 8).map((month, i) => (
            <td
              key={i}
              className='calendar__cell year__cell'
              onClick={() => handleSetDisplayMonth(month)}
            >
              {month.slice(0, 3)}
            </td>
          ))}
        </tr>
        <tr>
          {MONTHS.slice(8, 12).map((month, i) => (
            <td
              key={i}
              className='calendar__cell year__cell'
              onClick={() => handleSetDisplayMonth(month)}
            >
              {month.slice(0, 3)}
            </td>
          ))}
        </tr>
      </tbody>
    </React.Fragment>
  );
}

CalendarYearView.propTypes = {
  MONTHS: PropTypes.array.isRequired,
  setDisplayMonth: PropTypes.func.isRequired,
  displayYear: PropTypes.number.isRequired,
  setDisplayYear: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired
};
