import moment from 'moment';
import events from '../../gateway/events';

const hours = Array(24)
  .fill()
  .map((val, index) => (val = index + 1));

const eventsByHoursInDay = (date) => {
  const formatedDate = moment(date).format('L');

  const eventsByHours = events
    .filter(({ dateFrom }) => moment(dateFrom).format('L') === formatedDate)
    .map((event) => ({
      ...event,
      dateFrom: moment(event.dateFrom).format('H'),
      dateTo: moment(event.dateTo).format('H'),
    }))
    .reduce(
      (acc, { dateFrom, dateTo }) =>
        acc.concat(hours.slice(dateFrom - 1, dateTo)),
      []
    );

  return eventsByHours;
};

export const getArrOfErrorMessages = (dateFrom, dateTo) => {
  const checkEventByTime = hours
    .slice(moment(dateFrom).format('H') - 1, moment(dateTo).format('H'))
    .some((el) => eventsByHoursInDay(dateFrom).includes(el));

  const validations = [
    {
      invalid: moment(dateFrom).format('l') !== moment(dateTo).format('l'),
      errorText: 'The event must start and end within one day',
    },
    {
      invalid: dateFrom.getHours() > dateTo.getHours(),
      errorText: 'The event start date cannot be greater than end date',
    },
    {
      invalid: dateTo.getHours() - dateFrom.getHours() > 6,
      errorText: 'The event cannot be longer then 6 hours',
    },
    {
      invalid: checkEventByTime,
      errorText: 'There is already an event at this time',
    },
  ];

  const errorMessages = [];
  validations.forEach(({ invalid, errorText }) => {
    if (invalid) {
      errorMessages.push(errorText);
    }
  });

  return errorMessages;
};

