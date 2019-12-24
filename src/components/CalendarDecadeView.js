import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CalendarDecadeView({
  displayYear,
  setDisplayYear,
  setCurrentView
}) {
  const [beginningOfDecade, setBeginningOfDecade] = useState(
    displayYear - (displayYear % 10)
  );
  const [endingOfDecade, setEndingOfDecade] = useState(beginningOfDecade + 9);
  const arrayOfFive = new Array(5).fill();

  const handleSetDisplayYear = year => {
    setDisplayYear(year);
    setCurrentView('year');
  };
  const handleChangeDecade = addOrSub => {
    if (addOrSub === '+') {
      setBeginningOfDecade(beginningOfDecade + 10);
      setEndingOfDecade(endingOfDecade + 10);
    } else if (addOrSub === '-') {
      setBeginningOfDecade(beginningOfDecade - 10);
      setEndingOfDecade(endingOfDecade - 10);
    }
  };
  return (
    <React.Fragment>
      <thead className='calendar__header'>
        <tr>
          <td
            className='calendar__cell'
            onClick={() => handleChangeDecade('-')}
          >
            {'<'}
          </td>
          <th className='calendar__title' colSpan={3}>
            {`${beginningOfDecade}-${endingOfDecade}`}
          </th>
          <td
            className='calendar__cell'
            onClick={() => handleChangeDecade('+')}
          >
            {'>'}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          {arrayOfFive.map((el, i) => (
            <td
              key={i}
              className='calendar__cell year__cell'
              onClick={() => handleSetDisplayYear(beginningOfDecade + i)}
            >
              {beginningOfDecade + i}
            </td>
          ))}
        </tr>
        <tr>
          {arrayOfFive.map((el, i) => (
            <td
              key={i}
              className='calendar__cell year__cell'
              onClick={() => handleSetDisplayYear(beginningOfDecade + i + 5)}
            >
              {beginningOfDecade + i + 5}
            </td>
          ))}
        </tr>
      </tbody>
    </React.Fragment>
  );
}

CalendarDecadeView.propTypes = {
  displayYear: PropTypes.number.isRequired,
  setDisplayYear: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired
};
