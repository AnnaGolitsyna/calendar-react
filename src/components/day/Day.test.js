import React from 'react';
import { render } from '@testing-library/react';
import Day from './Day';

describe('Day', () => {
  const dataDay = new Date('2022-01-01');
  const dayEvents = [
    {
      dateFrom: new Date('2022-01-01T00:00:00'),
      dateTo: new Date('2022-01-01T01:00:00'),
      title: 'Event 1',
    },
    {
      dateFrom: new Date('2022-01-01T02:00:00'),
      dateTo: new Date('2022-01-01T03:00:00'),
      title: 'Event 2',
    },
    {
      dateFrom: new Date('2022-01-01T04:00:00'),
      dateTo: new Date('2022-01-01T05:00:00'),
      title: 'Event 3',
    },
  ];
  const onDeleteEvent = jest.fn();
  const onCreateEvent = jest.fn();
  const events = [];

  it('renders without crashing', () => {
    render(
      <Day
        dataDay={dataDay}
        dayEvents={dayEvents}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
        events={events}
      />
    );
  });

  it('renders 24 Hour components', () => {
    const { getAllByTestId } = render(
      <Day
        dataDay={dataDay}
        dayEvents={dayEvents}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
        events={events}
      />
    );
    expect(getAllByTestId('hour')).toHaveLength(24);
  });

  it('passes correct props to Hour components', () => {
    const { getAllByTestId } = render(
      <Day
        dataDay={dataDay}
        dayEvents={dayEvents}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
        events={events}
      />
    );
    const hours = getAllByTestId('hour');
    hours.forEach((hour, index) => {
      expect(hour).toHaveAttribute('data-day', dataDay.toISOString());
      expect(hour).toHaveAttribute('data-hour', index.toString());
      expect(hour).toHaveAttribute(
        'hour-events',
        JSON.stringify(
          dayEvents.filter((event) => event.dateFrom.getHours() === index)
        )
      );
      expect(hour).toHaveAttribute('on-delete-event', onDeleteEvent.toString());
      expect(hour).toHaveAttribute('on-create-event', onCreateEvent.toString());
      expect(hour).toHaveAttribute('events', JSON.stringify(events));
    });
  });
});
