// const events = [
//   {
//     id: 1,
//     title: 'Go to the gym',
//     description: 'some text here',
//     dateFrom: new Date(2023, 2, 10, 10, 15),
//     dateTo: new Date(2023, 2, 10, 15, 0),
//   },
//   {
//     id: 2,
//     title: 'Go to the school',
//     description: 'hello, 2 am',
//     dateFrom: new Date(2023, 1, 16, 10, 15),
//     dateTo: new Date(2023, 1, 16, 11, 0),
//   },
//   {
//     id: 3,
//     title: 'Lunch',
//     description: '',
//     dateFrom: new Date(2023, 2, 16, 10, 30),
//     dateTo: new Date(2023, 2, 16, 11, 30),
//   },
//   {
//     id: 4,
//     title: 'Meet friend',
//     description: 'at the cafe',
//     dateFrom: new Date(2023, 1, 26, 18, 30),
//     dateTo: new Date(2023, 1, 26, 20, 0),
//   },
// ];

// export default events;

const baseUrl = 'https://639acdd831877e43d676cd31.mockapi.io/users';

export const fetchEventsList = () => {
  return fetch(baseUrl)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error('Network response was not ok');
    })
    .catch((error) => {
      console.error('Error fetching events list:', error);
      throw error;
    });
};

export const fetchCreateEvent = (dataEvent) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataEvent),
  }).then((resp) => {
    if (!resp.ok) {
      alert('Failed to create event');
      throw new Error('Failed to create event');
    }
  });
};

export const fetchDeleteEvent = (eventId) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then((resp) => {
    if (!resp.ok) {
      alert('Failed to delete event');
      throw new Error('Failed to delete event');
    }
  });
};
