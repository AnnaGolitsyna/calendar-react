
import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment';


function DateComponent() {
  return (
    <div>
      {moment().startOf('week').toDate()}
      {moment().startOf('week').add(1, 'day').toDate()}
      {moment().startOf('week').add(2, 'day').toDate()}
      {moment().startOf('week').add(3, 'day').toDate()}
      {moment().startOf('week').add(4, 'day').toDate()}
      {moment().startOf('week').add(5, 'day').toDate()}
      {moment().startOf('week').add(6, 'day').toDate()}
    </div>
  );
}

describe('DateComponent', () => {
  test('renders dates correctly', () => {
    const { getByText } = render(<DateComponent />);
    expect(getByText(moment().startOf('week').format('L'))).toBeInTheDocument();
    expect(
      getByText(moment().startOf('week').add(1, 'day').format('L'))
    ).toBeInTheDocument();
    expect(
      getByText(moment().startOf('week').add(2, 'day').format('L'))
    ).toBeInTheDocument();
    expect(
      getByText(moment().startOf('week').add(3, 'day').format('L'))
    ).toBeInTheDocument();
    expect(
      getByText(moment().startOf('week').add(4, 'day').format('L'))
    ).toBeInTheDocument();
    expect(
      getByText(moment().startOf('week').add(5, 'day').format('L'))
    ).toBeInTheDocument();
    expect(
      getByText(moment().startOf('week').add(6, 'day').format('L'))
    ).toBeInTheDocument();
  });
});
