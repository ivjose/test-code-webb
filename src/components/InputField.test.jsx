import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../test-utils/testing-library-utils';

import InputField from './InputField';

const TestField = () => {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="Username"
      name="username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error="Required fields"
    />
  );
};

test('render input field', () => {
  render(<TestField />);

  const inputField = screen.getByLabelText(/username/i)
  expect(inputField).toBeInTheDocument();

  userEvent.clear(inputField);
  userEvent.type(inputField, 'john Doe');

  expect(inputField.value).toBe('john Doe')
  userEvent.clear(inputField);
  expect(inputField.value).toBe('')

  expect(inputField).toHaveClass('border-red-300 text-red-900');
});


 
