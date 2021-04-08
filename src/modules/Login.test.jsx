import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils/testing-library-utils';
import Login from './Login';

test('render input login', async () => {
  render(<Login />);
  const emailField = screen.getByLabelText(/email address/i);
  expect(emailField).toBeInTheDocument();

  userEvent.type(emailField, 'admin@email.com');

  const passwordField = screen.getByLabelText(/password/i);
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, '12345');

  const submitButton = screen.getByRole('button', { name: /sign in/i });
  userEvent.click(submitButton);
});

test('invalid credentials login', () => {
  const { debug } = render(<Login />);
  const emailField = screen.getByLabelText(/email address/i);
  expect(emailField).toBeInTheDocument();

  userEvent.type(emailField, 'other@email.com');

  const passwordField = screen.getByLabelText(/password/i);
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, 'p@ssw0rd');

  const submitButton = screen.getByRole('button', { name: /sign in/i });
  userEvent.click(submitButton);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent(/invalid Credentails/i);
  debug(emailField);
});
