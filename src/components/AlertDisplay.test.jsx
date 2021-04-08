import { render, screen } from '../test-utils/testing-library-utils';

import AlertDisplay from './AlertDisplay';

test('render alert display', () => {
  const { container } = render(<AlertDisplay />);

  expect(container.firstChild).toHaveClass('bg-gray-50');

  const checkMessage = screen.getByRole('alert');
  expect(checkMessage).toHaveClass('text-gray-800');
  expect(checkMessage).toHaveTextContent(/default message/i);
});

test('error alert display', () => {
  const { container } = render(
    <AlertDisplay status="error" message="Error Message" />
  );

  expect(container.firstChild).toHaveClass('bg-red-50');

  const checkMessage = screen.getByRole('alert');
  expect(checkMessage).toHaveClass('text-red-800');
  expect(checkMessage).toHaveTextContent(/error Message/i);
});

test('success alert display', () => {
  const { container } = render(
    <AlertDisplay status="success" message="Success Message" />
  );

  expect(container.firstChild).toHaveClass('bg-green-50');

  const checkMessage = screen.getByRole('alert');
  expect(checkMessage).toHaveClass('text-green-700');
  expect(checkMessage).toHaveTextContent(/success Message/i);
});
