
const baseUrl = 'https://639acdd831877e43d676cd31.mockapi.io/users';

export const fetchEventsList = () => {
  return fetch(baseUrl)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      alert("Internal Server Error. Can't display events")
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
