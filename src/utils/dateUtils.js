import moment from 'moment';

export const getWeekStartDate = (date) => {
  const dateCopy = moment(date);
  const dayOfWeek = moment(dateCopy).day();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = moment(
    moment(dateCopy).date(moment(date).date() + difference)
  );
  return new Date(
    moment(monday).year(),
    moment(monday).month(),
    moment(monday).date()
  );
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = moment(startDate);
    result.push(new Date(moment(base).date(moment(base).date() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(moment(date).hours(Number(hours)));
  const withMinutes = new Date(moment(withHours).minutes(Number(minutes)));
  return moment(withMinutes).valueOf();
};

export const getFormattedTime = (hours, minutes) => {
  const multiplesOf15Min = Math.floor(minutes / 15) * 15;
  const formattedMin = multiplesOf15Min < 10 ? `00` : `${multiplesOf15Min}`;
  return `${hours}:${formattedMin}`;
};

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};


export const getEndEventTimeInMs = (eventTime, prevDate) => {
  const newDate = moment(prevDate);
  return moment(newDate).add(+eventTime, 'hour').valueOf();
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
