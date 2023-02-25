import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const rootElement = document.querySelector('body');

ReactDOM.render(<App />, rootElement);

// const useValidation = (dateFrom, dateTo, validations) => {
//   console.log(dateFrom.getDate(), dateTo.getDate(), validations);
//   console.log(dateTo - dateFrom);
//   const [isOneDay, setIsOneDay] = useState(false);
//   const [isOverSixHours, setIsOverSixHours] = useState(false);

//   useEffect(() => {
//     for (let validate in validations) {
//       console.log('for', validate, validations[validate]);
//       switch (validations[validate]) {
//         case dateTo.getDate() - dateFrom.getDate() > 0:
//           setIsOneDay(true);
//           console.log('not one day');
//           break;

//         case dateTo.getHours() - dateFrom.getHours() > 6:
//           setIsOverSixHours(true);
//           console.log('over 6 hours');
//           break;

//         default:
//           console.log("don't work");
//           break;
//       }
//     }
//   }, [dateFrom, dateTo]);

//   console.log(isOneDay, isOverSixHours);
//   return isOneDay, isOverSixHours;
// };
