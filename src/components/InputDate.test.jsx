import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../test-utils/testing-library-utils';

import InputDate from './InputDate';

const TestField = () => {
  const [value, setValue] = useState('');

  return (
    <InputDate
      label="Birthdate"
      name="birthdate"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error="Required fields"
    />
  );
};

test('render input date Field', () => {
  render(<TestField />);

  const inputDateField = screen.getByLabelText(/birthdate/i);

  expect(inputDateField).toBeInTheDocument();

  userEvent.clear(inputDateField);
  userEvent.type(inputDateField, '11-21-2001');

  expect(inputDateField.value).toBe('11-21-2001');
  userEvent.clear(inputDateField);
  expect(inputDateField.value).toBe('');
  expect(inputDateField).toHaveClass('border-red-300 text-red-900');
});
