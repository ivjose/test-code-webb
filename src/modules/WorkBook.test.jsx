import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { render, screen } from '../test-utils/testing-library-utils';

import Workbook from './Workbook';

import { server } from '../mocks/server';

test('render workbook form', () => {
  render(<Workbook />);

  const personalInfo = screen.getByText(/personal information/i);
  expect(personalInfo).toBeInTheDocument();

  const firstNameLabel = screen.getByText(/first name/i);
  expect(firstNameLabel).toBeInTheDocument();

  const lastNameLabel = screen.getByText(/last name/i);
  expect(lastNameLabel).toBeInTheDocument();

  const emailAddressLabel = screen.getByText(/email address/i);
  expect(emailAddressLabel).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/email address/i);
  expect(emailInput).toHaveAttribute('type', 'email');

  const birthdateLabel = screen.getByText(/birthdate/i);
  expect(birthdateLabel).toBeInTheDocument();

  const passport = screen.getByText(/passport/i);
  expect(passport).toBeInTheDocument();

  const checkboxs = screen.getAllByRole('checkbox');
  expect(checkboxs).toHaveLength(4);
});

test('field validation', () => {
  render(<Workbook />);

  // First name
  const firstNameLabel = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameLabel, 'with numb3r5 and ch@r@t3r5');
  const firstNameError = screen.getByTestId(/first_name-error/i);
  expect(firstNameError).toHaveTextContent(/only letters/i);

  userEvent.clear(firstNameLabel);
  userEvent.type(firstNameLabel, ' ');
  expect(firstNameError).toHaveTextContent(/required field/i);

  //   // last Name
  const lastNameLabel = screen.getByLabelText(/last name/i);
  userEvent.type(lastNameLabel, 'with numb3r5 and ch@r@t3r5');
  const lastNameError = screen.getByTestId(/last_name-error/i);
  expect(lastNameError).toHaveTextContent(/only letters/i);

  userEvent.clear(lastNameLabel);
  userEvent.type(lastNameLabel, ' ');
  expect(lastNameError).toHaveTextContent(/required field/i);

  //   // Email
  const emailLabel = screen.getByLabelText(/email address/i);
  userEvent.type(emailLabel, 'not valid email');
  const emailError = screen.getByTestId(/email_address-error/i);
  expect(emailError).toHaveTextContent(/please use valid email address/i);

  userEvent.clear(emailLabel);
  userEvent.type(emailLabel, ' ');
  expect(emailError).toHaveTextContent(/required field/i);

  userEvent.clear(emailLabel);
  userEvent.type(emailLabel, 'valid@email.com');
  expect(emailError).not.toBeInTheDocument();

  // Birhtdate
  const birthDateLabel = screen.getByLabelText(/birthdate/i);
  userEvent.type(birthDateLabel, '11-21-2015');

  const birthdateError = screen.getByTestId(/birthdate-error/i);
  expect(birthdateError).toHaveTextContent(/user must be above 18 years old/i);

  userEvent.clear(birthDateLabel);
  userEvent.type(birthDateLabel, '41-21-201');
  expect(birthdateError).toHaveTextContent(/please enter valid Date/i);

  userEvent.clear(birthDateLabel);
  userEvent.type(birthDateLabel, ' ');
  expect(birthdateError).toHaveTextContent(/required field/i);

  // Passport
  const passportLabel = screen.getByLabelText(/passport/i);
  userEvent.type(passportLabel, ' ');
  const passportrror = screen.getByTestId(/passport-error/i);
  expect(passportrror).toHaveTextContent(/required field/i);
});

test('submit error validation', () => {
  render(<Workbook />);

  const submitButton = screen.getByText(/save/i);
  userEvent.click(submitButton);
  const checkAllValidation = screen.getAllByText(/required field/i);
  expect(checkAllValidation).toHaveLength(5);

  const firstNameLabel = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameLabel, 'John');
  userEvent.click(submitButton);
  const newCheckAllValidation = screen.getAllByText(/required field/i);
  expect(newCheckAllValidation).toHaveLength(4);

  const alert = screen.getByRole('alert');

  expect(alert).toHaveTextContent(/please select at least one workplace/i);
});

test('submit success api', async () => {
  render(<Workbook />);

  const firstNameLabel = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameLabel, 'John1');

  const lastNameLabel = screen.getByLabelText(/last name/i);
  userEvent.type(lastNameLabel, 'Doe1');

  const emailLabel = screen.getByLabelText(/email address/i);
  userEvent.type(emailLabel, 'sample1@email.com');

  const birthDateLabel = screen.getByLabelText(/birthdate/i);
  userEvent.type(birthDateLabel, '11-21-2001');

  const passportLabel = screen.getByLabelText(/passport/i);
  userEvent.type(passportLabel, 'AX123123');

  const googleWorkplace = screen.getByRole('checkbox', {
    name: /google/i,
  });
  userEvent.click(googleWorkplace);

  const amazonWorkplace = screen.getByRole('checkbox', {
    name: /amazon/i,
  });
  userEvent.click(amazonWorkplace);

 
  const submitButton = screen.getByRole('button', { name: /save/i });
  userEvent.click(submitButton);

  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent(/successfully created/i);
});

test('submit error api', async () => {
  server.resetHandlers(
    rest.post('https://api.jsonbin.io/v3/b', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<Workbook />);

  const firstNameLabel = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameLabel, 'John1');

  const lastNameLabel = screen.getByLabelText(/last name/i);
  userEvent.type(lastNameLabel, 'Doe1');

  const emailLabel = screen.getByLabelText(/email address/i);
  userEvent.type(emailLabel, 'sample1@email.com');

  const birthDateLabel = screen.getByLabelText(/birthdate/i);
  userEvent.type(birthDateLabel, '11-21-2001');

  const passportLabel = screen.getByLabelText(/passport/i);
  userEvent.type(passportLabel, 'AX123123');

  const googleWorkplace = screen.getByRole('checkbox', {
    name: /google/i,
  });

  userEvent.click(googleWorkplace);

  const amazonWorkplace = screen.getByRole('checkbox', {
    name: /amazon/i,
  });

  userEvent.click(amazonWorkplace);

  const submitButton = screen.getByRole('button', { name: /save/i });
  userEvent.click(submitButton);

  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent(/failed Submission/i);
});
