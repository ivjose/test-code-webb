import React, { useState } from 'react';
import { render, screen } from '../test-utils/testing-library-utils';

import Layout from './Layout';
test('render layout', () => {
  render(<Layout title="Page title">Hello World</Layout>);
  
  const pageTitle = screen.getByRole('heading', { name: /page title/i });
  expect(pageTitle).toBeInTheDocument();

  const childElement = screen.getByText(/hello world/i)
  expect(childElement).toBeInTheDocument();
});
