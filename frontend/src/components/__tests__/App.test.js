import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
  test('renders without errors', () => {
    render(<App />);
    // No errors occurred if the component rendered successfully
  });
});
