import moment from "moment";

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes.getTime();
};


export const getFormattedTime = (hours, minutes) => {
  const multiplesOf15Min = Math.floor(minutes / 15) * 15;
  const formattedMin = multiplesOf15Min < 10 ? `00` : `${multiplesOf15Min}`;
  return `${hours}:${formattedMin}`;
};


export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const getFormattedDateForFetch = (stringDate) => {
  const objDate = new Date();
  objDate.setTime(stringDate);
  return objDate;
};

export const getEndEventTimeInMs = (eventTime, prevDate) => {
  const newDate = moment(prevDate);
  return moment(newDate).add(+eventTime, 'hour').valueOf();
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

