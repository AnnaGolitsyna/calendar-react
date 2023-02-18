import React, { Component, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  // 1. finde newStartDay - where???
  // 2. create handler => send to Navigation
  // 3. create event onClick in the Navigation
  // cnahge state

  const newStartDay = new Date();
  newStartDay.setTime(weekDates[6].getTime() + 86400000);
  const newWeek = generateWeekRange(getWeekStartDate(weekDates[6]));
  console.log(newWeek, newStartDay);

  return (
    <>
      <Header weekDates={weekDates} />
      <Calendar weekDates={weekDates} />
    </>
  );
};

// class App extends Component {
//   state = {
//     weekStartDate: new Date(),
//   };

//   render() {
//     const { weekStartDate } = this.state;
//     const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

//     return (
//       <>
//         <Header />
//         <Calendar weekDates={weekDates} />
//       </>
//     );
//   }
// }

export default App;
