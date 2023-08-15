import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../Loader';

test('renders a loader with the specified variant', () => {
  const variant = 'primary';

  const { getByRole } = render(<Loader variant={variant} />);

  const spinner = getByRole('status');

  expect(spinner).toBeInTheDocument();

});
