import React from 'react';
import { shallow } from 'enzyme';
import Week from './Week';

describe('Week', () => {
  const weekDates = [
    new Date('2022-01-01'),
    new Date('2022-01-02'),
    new Date('2022-01-03'),
  ];
  const events = [
    {
      id: 1,
      dateFrom: new Date('2022-01-01T10:00:00'),
      dateTo: new Date('2022-01-01T12:00:00'),
    },
    {
      id: 2,
      dateFrom: new Date('2022-01-02T14:00:00'),
      dateTo: new Date('2022-01-02T16:00:00'),
    },
    {
      id: 3,
      dateFrom: new Date('2022-01-03T18:00:00'),
      dateTo: new Date('2022-01-03T20:00:00'),
    },
  ];
  const onDeleteEvent = jest.fn();
  const onCreateEvent = jest.fn();

  it('should render without crashing', () => {
    shallow(
      <Week
        weekDates={weekDates}
        events={events}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
      />
    );
  });

  it('should render 3 Day components', () => {
    const wrapper = shallow(
      <Week
        weekDates={weekDates}
        events={events}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
      />
    );
    expect(wrapper.find('Day')).toHaveLength(3);
  });

  it('should pass correct props to Day components', () => {
    const wrapper = shallow(
      <Week
        weekDates={weekDates}
        events={events}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
      />
    );
    const dayComponents = wrapper.find('Day');
    expect(dayComponents.at(0).props()).toEqual({
      key: 1,
      dataDay: new Date('2022-01-01'),
      dayEvents: [events[0]],
      onDeleteEvent,
      onCreateEvent,
      events,
    });
    expect(dayComponents.at(1).props()).toEqual({
      key: 2,
      dataDay: new Date('2022-01-02'),
      dayEvents: [events[1]],
      onDeleteEvent,
      onCreateEvent,
      events,
    });
    expect(dayComponents.at(2).props()).toEqual({
      key: 3,
      dataDay: new Date('2022-01-03'),
      dayEvents: [events[2]],
      onDeleteEvent,
      onCreateEvent,
      events,
    });
  });

  it('should handle empty events array', () => {
    const wrapper = shallow(
      <Week
        weekDates={weekDates}
        events={[]}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
      />
    );
    expect(wrapper.find('Day')).toHaveLength(3);
  });

  it('should handle weekDates array with less than 7 elements', () => {
    const wrapper = shallow(
      <Week
        weekDates={[new Date('2022-01-01'), new Date('2022-01-02')]}
        events={events}
        onDeleteEvent={onDeleteEvent}
        onCreateEvent={onCreateEvent}
      />
    );
    expect(wrapper.find('Day')).toHaveLength(2);
  });

  it('should handle onDeleteEvent prop not being passed', () => {
    const wrapper = shallow(
      <Week
        weekDates={weekDates}
        events={events}
        onCreateEvent={onCreateEvent}
      />
    );
    const dayComponents = wrapper.find('Day');
    expect(dayComponents.at(0).prop('onDeleteEvent')).toBeUndefined();
  });

  it('should handle onCreateEvent prop not being passed', () => {
    const wrapper = shallow(
      <Week
        weekDates={weekDates}
        events={events}
        onDeleteEvent={onDeleteEvent}
      />
    );
    const dayComponents = wrapper.find('Day');
    expect(dayComponents.at(0).prop('onCreateEvent')).toBeUndefined();
  });
});
