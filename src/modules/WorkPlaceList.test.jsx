import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils/testing-library-utils';

import Workbook from './Workbook';

test('render WorkPlaceList', () => {
  render(<Workbook />);

  const checkWorkplace = screen.getByRole('heading', {
    name: /work places/i,
  });

  expect(checkWorkplace).toBeInTheDocument();

  const checkboxs = screen.getAllByRole('checkbox');
  expect(checkboxs).toHaveLength(4);
});

test('WorkPlaceList Display if same period', () => {
  render(<Workbook />);

  const googleWorkplace = screen.getByRole('checkbox', {
    name: /google/i,
  });
  userEvent.click(googleWorkplace);

  const facebookWorkplace = screen.getByRole('checkbox', {
    name: /facebook/i,
  });
  userEvent.click(facebookWorkplace);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent(
    /you can only select one company during the same period date/i
  );

  userEvent.click(facebookWorkplace);

  const amazonWorkplace = screen.getByRole('checkbox', {
    name: /amazon/i,
  });
  userEvent.click(amazonWorkplace);

  const noAlert = screen.queryByRole('alert');

  expect(noAlert).not.toBeInTheDocument();
});
