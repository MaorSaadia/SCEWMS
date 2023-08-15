import React from 'react';
import { render } from '@testing-library/react';
import Message from '../Message';

test('renders a message with the specified variant', () => {
  const variant = 'success';
  const messageText = 'This is a success message';

  const { getByText } = render(
    <Message variant={variant}>{messageText}</Message>
  );

  const message = getByText(messageText);

  expect(message).toBeInTheDocument();
  expect(message).toHaveClass(`alert-${variant}`);
});
