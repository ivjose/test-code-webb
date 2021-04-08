import userEvent from '@testing-library/user-event';

import { render, screen } from './test-utils/testing-library-utils';

import App from './App';

test('login admin user app', async () => {
  render(<App />);

  const emailField = screen.getByLabelText(/email address/i);
  expect(emailField).toBeInTheDocument();

  userEvent.type(emailField, 'admin@email.com');

  const passwordField = screen.getByLabelText(/password/i);
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, '12345');

  const submitButton = screen.getByRole('button', { name: /sign in/i });
  userEvent.click(submitButton);

  const newWorkBookForm = screen.getByRole('heading', {
    name: /admin/i,
  });
  expect(newWorkBookForm).toBeInTheDocument();
});

test('login basic user app', async () => {
  render(<App />);

  const emailField = screen.getByLabelText(/email address/i);
  expect(emailField).toBeInTheDocument();

  userEvent.type(emailField, 'user@email.com');

  const passwordField = screen.getByLabelText(/password/i);
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, '12345');

  const submitButton = screen.getByRole('button', { name: /sign in/i });
  userEvent.click(submitButton);

  const newWorkBookForm = screen.getByRole('heading', {
    name: /basic/i,
  });
  expect(newWorkBookForm).toBeInTheDocument();
});
